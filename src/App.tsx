import { useState } from 'react'

import { CitiesFormattedData } from './ts/public-interfaces'

import { Main } from './components/Main'
import { Sidebar } from './components/Sidebar'

import { Content, GlobalStyle } from './style/global'

export function App() {
  const [currentCity, setCurrentCity] = useState<CitiesFormattedData>({} as CitiesFormattedData);
  console.log('APP', currentCity);

  return (
    <Content>
      <Main />
      <Sidebar setCurrentCity={setCurrentCity}/>

      <GlobalStyle />
    </Content>
  );
}