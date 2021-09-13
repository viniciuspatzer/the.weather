import { useLayoutEffect, useState } from 'react'

import { Place, WeatherData } from './types/interfaces'
import { LOCATION_IQ_API_URL_FORWARD, WEATHER_API_URL } from './config/api'
import { getRandomCityName } from './utils/functions'
import axios from 'axios';

import { Main } from './components/Main'
import { Sidebar } from './components/Sidebar'

import { Content, GlobalStyle } from './style/global'

export function App() {
  const [currentPlace, setCurrentPlace] = useState<Place>({} as Place);
  const [weatherData, setWeatherData] = useState({} as WeatherData);
  const [loading, setLoading] = useState(true);
  
  useLayoutEffect(() => {
    (async function setRandomFirstPlace() {
      try {
        const randomPlace = getRandomCityName();
        const response = await axios.get(`${LOCATION_IQ_API_URL_FORWARD}&city=${randomPlace}`);
        const { lat, lon } = response.data[0];
        
        setCurrentPlace({
          name: randomPlace,
          lat,
          lon,
        });

      } catch(err) {
        console.error(err);
      }
    })();
   }, []);

   useLayoutEffect(() => {
    (async function getWeather() {
      if (!currentPlace.name) return;

      try {
        setLoading(true);
        const { lat, lon } = currentPlace;
        const response =  await axios.get(`${WEATHER_API_URL}&lat=${lat}&lon=${lon}&units=metric`);

        setWeatherData({
          ...response.data,
          place: currentPlace
        });

      } catch(err) {  
        console.error(err);
      }

      setLoading(false);
    })();
  }, [currentPlace]);

  return (
    <Content>
      <Main weatherData={weatherData} loading={loading}/>
      <Sidebar setCurrentPlace={setCurrentPlace} weatherData={weatherData} loading={loading}/>
      <GlobalStyle />
    </Content>
  );
}