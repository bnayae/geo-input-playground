import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useMemo } from "react";
import { IWithClass } from "../../../contracts/IWithClass";
import { IPlace } from "../IPlace";

// Docs: https://react-google-maps-api-docs.netlify.app/
// Options: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControl
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses

interface IGMap extends IWithClass {
  place?: IPlace;
}

const containerStyle = {
  width: "400px",
  height: "600px",
};

export const GMapRaw = ({ className, place }: IGMap) => {
  const location = place?.geometry?.location;

  const onLoadMap = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback((map) => {}, []);

  const zoom = useMemo(() => {
    let zoomResult = 4;
    if (place?.types?.indexOf("country") != -1) zoomResult = 3;
    else if (place?.types?.indexOf("administrative_area_level_1") != -1)
      zoomResult = 3.5;
    else if (place?.types?.indexOf("administrative_area2") != -1)
      zoomResult = 7;
    else if (place?.types?.indexOf("locality") != -1) zoomResult = 12;
    else if (place?.types?.indexOf("sublocality") != -1) zoomResult = 14;
    else if (place?.types?.indexOf("route") != -1) zoomResult = 16;
    else if (place?.types?.indexOf("street_address") != -1) zoomResult = 17;
    else if (place?.types?.indexOf("postal_code") != -1) zoomResult = 18;
    console.log("## types", zoomResult);
    return zoomResult;
  }, [place]);

  return (
    <div className={className}>
      <h4>Zoom: {zoom}</h4>
      {/* <JSONPretty data={location} /> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapContainerClassName="map-container"
        center={location}
        zoom={zoom}
        onLoad={onLoadMap}
        onUnmount={onUnmount}
        clickableIcons={false}
        options={{
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
};
