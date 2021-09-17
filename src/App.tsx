import { useLayoutEffect, useState, useRef } from 'react'

import { Place, WeatherData } from './types/interfaces'
import { WEATHER_API_URL } from './config/api'
import { getRandomCitiesArr } from './helpers/functions'
import axios from 'axios';

import { Main } from './components/Main'
import { Sidebar } from './components/Sidebar'

import bg from './assets'

import { Content, GlobalStyle } from './style/global'

export function App() {
  const [currentPlace, setCurrentPlace] = useState<Place>({} as Place);
  const [weatherData, setWeatherData] = useState({} as WeatherData);
  const [loading, setLoading] = useState(true);

  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const [bgColor, setBgColor] = useState<string>('');
  
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

  useLayoutEffect(() => {
    preloadedImages.current = bg.map(image => {
      const img = new Image();
      img.src = image;
      
      return img
    });
  }, []);

  useLayoutEffect(() => {
    (function handleChangingBackground() {
      if (!weatherData.timezone) return;

      for (const img of preloadedImages.current) {
        const { icon } = weatherData.current.weather[0];
        const regex = new RegExp(icon, 'gi');
        const value = img.currentSrc;

        if (value.match(regex)) {
          setBgColor(value);
          break;
        } 
      }

    })();
  }, [weatherData]);

  return (
    <Content bgColor={bgColor}>
      <Main weatherData={weatherData} loading={loading}/>
      <Sidebar setCurrentPlace={setCurrentPlace} weatherData={weatherData} loading={loading}/>
      <GlobalStyle />
    </Content>
  );
}