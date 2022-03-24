import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback } from "react";
import JSONPretty from "react-json-pretty";
import { IWithClass } from "../../../contracts/IWithClass";

// Docs: https://react-google-maps-api-docs.netlify.app/
// Options: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.fullscreenControl
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields
// https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsResponses

interface IGMap extends IWithClass {
  location?: google.maps.LatLngLiteral;
}

const containerStyle = {
  width: "400px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export const GMapRaw = ({ className, location }: IGMap) => {
  const onLoadMap = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback((map) => {}, []);

  return (
    <div className={className}>
      <JSONPretty data={location} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        mapContainerClassName="map-container"
        center={location}
        zoom={8}
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
