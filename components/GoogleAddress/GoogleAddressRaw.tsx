import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

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

export const GoogleAddressRaw = ({ className }: IWithClass) => {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

  const [city, setCity] = useState<string | undefined>();

  const handleChanged = (newValue: unknown) => {
    console.log("## PLACE", newValue);
  };

  return (
    <div className={className}>
      <div className="card-container">
        <div className="panel">
          <div>
            <Image
              className="sb-title-icon"
              src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg"
              alt="Location"
              width="24px"
              height="24px"
            />
            <span className="sb-title">Address Selection</span>
          </div>
          <input type="text" placeholder="Address" id="location" />
          <input type="text" placeholder="Apt, Suite, etc (optional)" />
          <input type="text" placeholder="City" id="locality" />
          <div className="half-input-container">
            <input
              type="text"
              className="half-input"
              placeholder="State/Province"
              id="administrative_area_level_1"
            />
            <input
              type="text"
              className="half-input"
              placeholder="Zip/Postal code"
              id="postal_code"
            />
          </div>
          <input type="text" placeholder="Country" id="country" />
          <button className="button-cta">Select</button>
        </div>
        <div className="map" id="map"></div>
      </div>
      <Script
        id="maps.googleapis.com"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${api_key}`}
      />
      <Script
        strategy="beforeInteractive"
        src={`    "use strict";

        function initMap() {
          const CONFIGURATION = {
            "ctaTitle": "Select",
            "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22},
            "mapsApiKey": "${api_key}",
            "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
          };
          const componentForm = [
            'location',
            'locality',
            'administrative_area_level_1',
            'country',
            'postal_code',
          ];
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: CONFIGURATION.mapOptions.zoom,
            center: { lat: 37.4221, lng: -122.0841 },
            mapTypeControl: false,
            fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
            zoomControl: CONFIGURATION.mapOptions.zoomControl,
            streetViewControl: CONFIGURATION.mapOptions.streetViewControl
          });
          const marker = new google.maps.Marker({map: map, draggable: false});
          const autocompleteInput = document.getElementById('location');
          const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
            fields: ["address_components", "geometry", "name"],
            types: ["address"],
          });
          autocomplete.addListener('place_changed', function () {
            marker.setVisible(false);
            const place = autocomplete.getPlace();
            if (!place.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert('No details available for input: \'' + place.name + '\'');
              return;
            }
            renderAddress(place);
            fillInAddress(place);
          });
    
          function fillInAddress(place) {  // optional parameter
            const addressNameFormat = {
              'street_number': 'short_name',
              'route': 'long_name',
              'locality': 'long_name',
              'administrative_area_level_1': 'short_name',
              'country': 'long_name',
              'postal_code': 'short_name',
            };
            const getAddressComp = function (type) {
              for (const component of place.address_components) {
                if (component.types[0] === type) {
                  return component[addressNameFormat[type]];
                }
              }
              return '';
            };
            document.getElementById('location').value = getAddressComp('street_number') + ' '
                      + getAddressComp('route');
            for (const component of componentForm) {
              // Location field is handled separately above as it has different logic.
              if (component !== 'location') {
                document.getElementById(component).value = getAddressComp(component);
              }
            }
          }
    
          function renderAddress(place) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
          }
        }`}
      />
    </div>
  );
};
