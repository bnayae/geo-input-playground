export interface IPlace {
  formattedAddress?: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
  placeId: string;
  types: string[];
  url: string;
}
