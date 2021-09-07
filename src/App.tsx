import { useEffect } from 'react'

import { Content, GlobalStyle } from './style/global'

import { Summary } from './components/Summary'
import { Overview } from './components/Overview'
import { Logo } from './components/Logo'

export function App() {

  useEffect(() => {
    (async () => {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const input = '';

      const res1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`);
      const data1 = await res1.json();
      
      const {lon, lat} = data1.coord;

      const res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}
      `);
      const data2 = await res2.json();

      console.log(data1);
      console.log(data2);
    })();
  }, []);

  return (
    <Content>
      <Logo />
      <Summary />
      <Overview />

      <GlobalStyle />
    </Content>
  );
}