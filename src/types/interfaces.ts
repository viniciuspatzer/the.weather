export interface PlacesAPI {
  address: {
    name: string;
    state: string;
    country: string;
  }
  display_name: string;
  lat: string;
  lon: string;
}

export interface Place {
  name: string;
  display_name?: string;
  lat: string;
  lon: string;
}


interface Weather {
  icon: string;
  description: string;
}

interface DailyWeather {
  rain?: number;
  temp: {
    min: number;
    max: number;
  }
  weather: Weather[];
  sunrise: number;
}

interface HourlyWeather {
  temp: number;
}

export interface WeatherData {
  current: {
    temp: number;
    clouds: number;
    humidity: number;
    wind_speed: number;
    rain?: number;
    weather: Weather[];
  }
  daily: DailyWeather[];
  hourly: HourlyWeather[];
  timezone: string;
  place: Place;
}