export interface PlacesDataAPI {
  address: {
    name: string;
    city: string;
    state: string;
    country: string;
    displayName: string;
  }
  lat: string;
  lon: string;
}