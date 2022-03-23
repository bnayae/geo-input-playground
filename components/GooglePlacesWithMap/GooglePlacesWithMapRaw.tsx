import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import React, { KeyboardEvent, useCallback, useMemo, useState } from "react";
import JSONPretty from "react-json-pretty";

/*
    Copyright 2021 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    
*/

const scriptOptions = {
  googleMapsApiKey: process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  libraries: ["places"],
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface IWithClass {
  className?: string;
}

export interface ISuggest {
  formattedAddress?: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
  placeId: string;
  types: string[];
  url: string;
}

// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
const FIELDS = [
  "place_id",
  "name",
  "geometry.location",
  "url",
  "type",
  // "photos",
  "formatted_address",
];

export const GooglePlacesWithMapRaw = ({ className }: IWithClass) => {
  const { isLoaded, loadError } = useLoadScript(scriptOptions as any);
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [place, setPlace] = useState<ISuggest | undefined>();
  const [map, setMap] = useState<unknown | undefined>();

  const location = useMemo(() => {
    if (!place) return undefined;
    const loc = place.geometry.location;
    return {
      lat: loc.lat,
      lng: loc.lng,
    };
  }, [place]);

  const { isLoaded: isJsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const onLoadMap = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(undefined);
  }, []);

  // Handle the keypress for input
  const onKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const onLoad = (autocompleteObj: google.maps.places.Autocomplete) => {
    console.log("## autocompleteObj", autocompleteObj);
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const res: ISuggest = (autocomplete as any).getPlace();
      setPlace(res);
    }
  };

  return (
    <div className="bg-white shadow p-10 rounded">
      {loadError && (
        <div>Google Map script cannot be loaded, please reload the page</div>
      )}

      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">
        Search Place
      </h1>
      {isLoaded && (
        <>
          <Autocomplete
            onLoad={onLoad}
            fields={FIELDS}
            onPlaceChanged={onPlaceChanged as any}
          >
            <input
              type="text"
              className="form-input block py-3 w-full rounded-md"
              placeholder="Type keywords..."
              onKeyPress={onKeypress}
            />
          </Autocomplete>
        </>
      )}
      {isJsLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoadMap}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>{location && <Marker position={location} />}</>
        </GoogleMap>
      )}
      <JSONPretty data={place} />
    </div>
  );
};
