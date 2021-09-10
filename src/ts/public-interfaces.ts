export interface PlacesDataAPI {
  address: {
    name: string;
    state: string;
    country: string;
  }
  display_name: string;
  lat: string;
  lon: string;
}