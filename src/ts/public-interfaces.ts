export interface CitiesOriginalData {
  address: {
    name: string;
    city: string;
    state: string;
    country: string;
  }
  lat: string;
  lon: string;
}

export interface Coords {
  lat: string;
  lon: string;
}

export interface CitiesFormattedData {
  city: string;
  state: string;
  country: string;
  displayName: string;
  coords: Coords;
}