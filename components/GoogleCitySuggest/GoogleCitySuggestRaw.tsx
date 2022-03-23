import Script from "next/script";
import { useRef, useState } from "react";
import Geosuggest, { Suggest } from "react-geosuggest";

interface IWithClass {
  className?: string;
}

export const GoogleCitySuggestRaw = ({ className }: IWithClass) => {
  const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const [city, setCity] = useState<Suggest | undefined>();

  const handleChanged = (newValue: Suggest) => {
    setCity(newValue);
  };

  const geosuggestEl = useRef<Geosuggest>(null);
  const fixtures = [
    { label: "New York", location: { lat: 40.7033127, lng: -73.979681 } },
    { label: "Rio", location: { lat: -22.066452, lng: -42.9232368 } },
    { label: "Tokyo", location: { lat: 35.673343, lng: 139.710388 } },
  ];

  return (
    <div className={className}>
      <Geosuggest
        onSuggestSelect={handleChanged}
        className="geo-suggest"
        inputClassName="geo-suggest-input"
        suggestsClassName="geo-suggest-option"
      />
      {city?.label}

      <Script
        id="maps.googleapis.com"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${api_key}`}
      />
    </div>
  );
};
