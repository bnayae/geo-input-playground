import { Autocomplete, LoadScript } from "@react-google-maps/api";
import React, { KeyboardEvent, useMemo, useState } from "react";
import JSONPretty from "react-json-pretty";
import { googleMapsApiKey } from "../../../contracts/googleMapsApiKey";
import { IWithClass } from "../../../contracts/IWithClass";
import { GMap } from "../GMap/GMap";
import { IPlace } from "../IPlace";
import { PLACE_FIELDS } from "../PLACE_FIELDS";

// Docs: https://react-google-maps-api-docs.netlify.app/
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses

export const GooglePlacesWithMapRaw = ({ className }: IWithClass) => {
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [place, setPlace] = useState<IPlace | undefined>();

  const location = useMemo(() => {
    if (!place) return undefined;
    const loc = place.geometry.location;
    return loc;
  }, [place]);

  // Handle the keypress for input
  const onKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const onLoad = (autocompleteObj: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const res: IPlace = (autocomplete as any).getPlace();
      setPlace(res);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  return (
    <div className={className}>
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">
        Search Place
      </h1>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={["places"]}
        onError={handleError}
      >
        <div className="layout">
          <div className="places">
            <Autocomplete
              onLoad={onLoad}
              fields={PLACE_FIELDS}
              onPlaceChanged={onPlaceChanged as any}
            >
              <input
                type="text"
                className="form-input block py-3 w-full rounded-md"
                placeholder="Type keywords..."
                onKeyPress={onKeypress}
              />
            </Autocomplete>
            <JSONPretty data={place} />
          </div>
          <GMap className="map" place={place} />
        </div>
      </LoadScript>
    </div>
  );
};
