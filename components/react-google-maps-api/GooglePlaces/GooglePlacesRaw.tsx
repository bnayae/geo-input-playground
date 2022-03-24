import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import React, { KeyboardEvent, useState } from "react";
import JSONPretty from "react-json-pretty";
import { IWithClass } from "../../../contracts/IWithClass";
import { ISuggest } from "../ISuggest";
import { PLACE_FIELDS } from "../PLACE_FIELDS";
import { scriptOptions } from "../scriptOptions";

export const GooglePlacesRaw = ({ className }: IWithClass) => {
  const { isLoaded, loadError } = useLoadScript(scriptOptions as any);
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [place, setPlace] = useState<ISuggest | undefined>();

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
      const res: ISuggest = (autocomplete as any).getPlace();
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
          <div className="w-full">
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
          </div>
          <JSONPretty data={place} />
        </>
      )}
    </div>
  );
};
