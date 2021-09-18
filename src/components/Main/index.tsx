import { Content } from "./styles"

import { WeatherData } from '../../types/interfaces'

interface MainProps {
  weatherData: WeatherData;
  loading: boolean;
  error: boolean;
}

export function Main({ weatherData, loading, error }: MainProps) {
  return (
    <Content>
      <a className="logo" href="https://theweather-viniciuspatzer.netlify.app/">
        the.weather
      </a>

      {!loading && !error && (
        <div className="wrapper">
          <h1>{Math.round(weatherData.current.temp)}°</h1>
          <div className="info">
            <div className="stats">
              <h3>{weatherData.place.name}</h3>
              <span>
                {new Date().toLocaleTimeString('en-us', {
                  timeZone: weatherData.timezone,
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="status">
              <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather icon" />
              <span>{weatherData.current.weather[0].description}</span>
            </div>
          </div>
          {/* <div className="status">
            <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather icon" />
            <span>{weatherData.current.weather[0].description}</span>
          </div> */}
        </div>
      )}
    </Content>
  );
}