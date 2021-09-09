import { useEffect, useState } from 'react'

import { PlacesDataAPI } from './ts/public-interfaces'
import { WEATHER_API_URL } from './config/api'
import { isObjectEmpty } from './helpers/functions'
import axios from 'axios';

import { Main } from './components/Main'
import { Sidebar } from './components/Sidebar'

import { Content, GlobalStyle } from './style/global'


export function App() {
  const [currentCity, setCurrentCity] = useState<PlacesDataAPI>({} as PlacesDataAPI);
  // const [navigatorConfig, setNavigatorConfig] = useState();

  // useEffect(() => {
  //   navigator.language...
  //   setNavigatorConfig()
  // }, []);
  
  useEffect(() => {
    if (isObjectEmpty(currentCity)) {
      return;
    }

    console.log(currentCity);

    const { lat, lon } = currentCity;

    (async function getWeather() {
      const response = 
        await axios.get(`${WEATHER_API_URL}&lat=${lat}&lon=${lon}&units=metric`);
      console.log(response.data);
      
    })();

  }, [currentCity]);

  return (
    <Content>
      <Main />
      <Sidebar setCurrentCity={setCurrentCity}/>
      <GlobalStyle />
    </Content>
  );
}