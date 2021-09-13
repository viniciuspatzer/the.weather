import { useLayoutEffect, useState } from 'react'

import { Place, WeatherData } from './types/interfaces'
import { WEATHER_API_URL } from './config/api'
import { getRandomCitiesArr } from './helpers/functions'
import axios from 'axios';

import { Main } from './components/Main'
import { Sidebar } from './components/Sidebar'

import { Content, GlobalStyle } from './style/global'

export function App() {
  const [currentPlace, setCurrentPlace] = useState<Place>({} as Place);
  const [weatherData, setWeatherData] = useState({} as WeatherData);
  const [loading, setLoading] = useState(true);
  
  useLayoutEffect(() => {
    (function setRandomFirstPlace() {
      const [ place ] = getRandomCitiesArr(1);
      setCurrentPlace(place);
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