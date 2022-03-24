export interface ISuggest {
  formattedAddress?: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
  placeId: string;
  types: string[];
  url: string;
}
