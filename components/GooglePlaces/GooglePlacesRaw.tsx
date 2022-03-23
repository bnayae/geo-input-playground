import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useRef, useState } from "react";
import JSONPretty from "react-json-pretty";

const scriptOptions = {
  googleMapsApiKey: process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  libraries: ["places"],
};
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

export const GooglePlacesRaw = ({ className }: IWithClass) => {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions as any);
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [place, setPlace] = useState<ISuggest | undefined>();
  const inputEl = useRef(null);

  // Handle the keypress for input
  const onKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  // const handleSubmit = (e: BaseSyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  const onLoad = (autocompleteObj: google.maps.places.Autocomplete) => {
    console.log("## autocompleteObj", autocompleteObj);
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const res: ISuggest = (autocomplete as any).getPlace();
      if ("place_id" in res) {
        // router.push(`/place/${place.place_id}`);
      }
      setPlace(res);
    }
  };

  return (
    <div className="bg-white shadow p-10 rounded">
      {loadError && (
        <div>Google Map script cannot be loaded, please reload the page</div>
      )}

      {isLoaded && (
        <>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">
            Search Place
          </h1>
          {/* <form className="flex" onSubmit={handleSubmit}> */}
          <div className="w-full">
            <Autocomplete
              onLoad={onLoad}
              fields={FIELDS}
              onPlaceChanged={onPlaceChanged as any}
            >
              <input
                ref={inputEl}
                type="text"
                className="form-input block py-3 w-full rounded-md"
                placeholder="Type keywords..."
                onKeyPress={onKeypress}
              />
            </Autocomplete>
          </div>
          {/* </form> */}
          <JSONPretty data={place} />
        </>
      )}
    </div>
  );
};
