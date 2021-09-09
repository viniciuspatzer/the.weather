import { Search } from '../Search';

import { CitiesFormattedData } from '../../ts/public-interfaces'

import { Content } from "./styles";


interface SidebarProps {
  setCurrentCity: (params: CitiesFormattedData) => void;
}

export function Sidebar({ setCurrentCity }: SidebarProps) {
  
  return (
    <Content>
      <Search setCurrentCity={setCurrentCity}/>
      <h1>Overview</h1>
    </Content>
  );
}
