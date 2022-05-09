import React from "react";
import { IWithClass } from "../../../contracts/IWithClass";
import { GooglePlacesWithMap } from "./GooglePlacesWithMap";
import { GooglePlaceTypeFilter } from "./GooglePlaceTypeFilter";

// Docs: https://react-google-maps-api-docs.netlify.app/
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses
// TYPES FILTER: https://developers.google.com/maps/documentation/places/web-service/supported_types#table3

export const GooglePlacesWithMapsRaw = ({ className }: IWithClass) => {
  return (
    <div className={className}>
      <GooglePlacesWithMap
        filter={[GooglePlaceTypeFilter.administrative_area_level_1]}
      />
      <GooglePlacesWithMap
        filter={[
          GooglePlaceTypeFilter.administrative_area_level_2,
          GooglePlaceTypeFilter.locality,
          GooglePlaceTypeFilter.sublocality,
        ]}
      />
    </div>
  );
};
