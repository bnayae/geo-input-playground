import { Autocomplete, LoadScript } from "@react-google-maps/api";
import React, { KeyboardEvent, useState } from "react";
import JSONPretty from "react-json-pretty";
import { googleMapsApiKey } from "../../../contracts/googleMapsApiKey";
import { IWithClass } from "../../../contracts/IWithClass";
import { GMap } from "../GMap/GMap";
import { IPlace } from "../IPlace";
import { PLACE_FIELDS } from "../PLACE_FIELDS";
import { GooglePlaceTypeFilter } from "./GooglePlaceTypeFilter";

// Docs: https://react-google-maps-api-docs.netlify.app/
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
// TYPES FILTER: https://developers.google.com/maps/documentation/places/web-service/supported_types#table3

interface IProps extends IWithClass {
  filter?: (GooglePlaceTypeFilter | keyof typeof GooglePlaceTypeFilter)[];
}

export const GooglePlacesWithMapRaw = ({ className, filter }: IProps) => {
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();
  const [place, setPlace] = useState<IPlace | undefined>();

  // const location = useMemo(() => {
  //   if (!place) return undefined;
  //   const loc = place?.geometry?.location;
  //   return loc;
  // }, [place]);

  // Handle the keypress for input
  const onKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const onLoad = (autocompleteObj: google.maps.places.Autocomplete) => {
    if (filter) autocompleteObj.setTypes(filter);
    // autocompleteObj.setFields([
    //   "place_id",
    //   "geometry",
    //   "name",
    //   "types",
    //   "url",
    //   "formatted_address",
    //   "geometry",
    //   "html_attributions",
    //   "icon",
    //   "icon_background_color",
    //   "icon_mask_base_uri",
    //   "photos",
    //   "plus_code",
    //   "website",
    // ]);
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();
      const res: IPlace = place as unknown as IPlace;
      autocomplete.getPlace();
      setPlace(res);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  return (
    <div className={className}>
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">
        Search Place{" "}
        {filter?.includes(GooglePlaceTypeFilter.administrative_area_level_1)
          ? "State"
          : "Cities"}
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
          </div>
          <GMap className="map" place={place} />
          <JSONPretty data={place} />
        </div>
      </LoadScript>
    </div>
  );
};
