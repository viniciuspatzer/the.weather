// import { useState } from 'react'

// import { WEATHER_API_KEY } from './config/api'

import { Content, GlobalStyle } from './style/global'

import { Main } from './components/Main'
import { Overview } from './components/Overview'

export function App() {

  // useEffect(() => {
  //   (async () => {
  //     const apiKey = process.env.REACT_APP_WEATHER_KEY;
  //     const input = '';

  //     const res1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`);
  //     const data1 = await res1.json();
      
  //     const {lon, lat} = data1.coord;

  //     const res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}
  //     `);
  //     const data2 = await res2.json();

  //     console.log(data1);
  //     console.log(data2);
  //   })();
  // }, []);

  return (
    <Content>
      <Main />

      <Overview />



      <GlobalStyle />
    </Content>
  );
}