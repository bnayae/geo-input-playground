import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback } from "react";
import JSONPretty from "react-json-pretty";
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
  const location = place?.geometry.location;

  const onLoadMap = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback((map) => {}, []);

  let zoom = 3;
  if (place?.types.indexOf("country") != -1) zoom = 5;
  else if (place?.types.indexOf("locality") != -1) zoom = 12;
  else if (place?.types.indexOf("route") != -1) zoom = 16;
  else if (place?.types.indexOf("street_address") != -1) zoom = 17;

  return (
    <div className={className}>
      <h4>{zoom}</h4>
      <JSONPretty data={location} />
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
