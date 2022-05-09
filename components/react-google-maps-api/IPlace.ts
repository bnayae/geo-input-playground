// export interface IPlace
//   extends Pick<
//     google.maps.places.PlaceResult,
//     | "place_id"
//     | "name"
//     | "types"
//     | "url"
//     | "formatted_address"
//     | "geometry"
//     | "html_attributions"
//     | "icon"
//     | "icon_background_color"
//     | "icon_mask_base_uri"
//     | "photos"
//     | "plus_code"
//     | "website"
//   > {
export interface IPlace {
  formattedAddress?: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
  placeId: string;
  types: string[];
  url: string;
}
