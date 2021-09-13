import { useState, useEffect, useRef, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi'

import { waitUntil } from '../../utils/functions'
import { LOCATION_IQ_API_URL_AUTO } from '../../config/api'
import axios from 'axios'

import { PlacesAPI, Place } from '../../types/interfaces'

import { Content } from "./styles";

interface SidebarProps {
  setCurrentPlace: (params: Place) => void;
}

export function Search({ setCurrentPlace }: SidebarProps) {
  const [placesData, setPlacesData] = useState<Place[]>([]);
  const placesDataRef = useRef<Place[]>([]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const throttling = useRef(false);
  const fetching = useRef(true);

  useEffect(() => {
    (function getFirstSuggestedPlaces() {

      // I tried to do this with another way, but I didn' find any free api with no requests limit...

      const placesName = [];
      while (placesName.length < 5) {
        placesName.push('a');
      }
      
    
      // const ArrCom4obj = autocompletePlacesArr.filter(obj => {
      //   arrCom4places.includes(obj.name)
      // })

      // name: string;
      // display_name?: string;
      // lat: string;
      // lon: string;

      // setPlacesData(um array com 4 objetos com o formato Place)
    })();
  }, []);

  function handleSelectCity(data: Place)  {
    inputRef.current.value = data.display_name!;
    setCurrentPlace(data);
  }

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    await waitUntil(() => fetching.current === false);
    handleSelectCity(placesDataRef.current[0]);
  }

  function handleThrottleSearch() {
    if (throttling.current || !inputRef.current.value.trim()) {
      return;
    }
    throttling.current = true;

    setTimeout(async () => {
      if (!inputRef.current.value.trim()) {
        return;
      }
      throttling.current = false;
      fetching.current = true;
      
      try {
        const response = await axios.get(`${LOCATION_IQ_API_URL_AUTO}&q=${inputRef.current.value}`);
        const data = response.data.map((data: PlacesAPI) => {
          const {name, state, country} = data.address;
          const { lat, lon } = data;
          return {
            name,
            display_name: `${name}, ${state ? state + "," : ""} ${country}`,
            lat,
            lon,
          };
        });
        setPlacesData(data);
        placesDataRef.current = data;

      } catch(err) {
        console.error(err);
      }
      fetching.current = false;
      
    }, 500);
  }

  return (
    <Content>

      <form onSubmit={handleSubmitForm} className="search-bar">
        <input
          type="text"
          placeholder="Another location"
          ref={inputRef}
          onChange={handleThrottleSearch}
        />
        <button type="submit" className="icon-box">
          <FiSearch color="#000" size="30px" />
        </button>
      </form>

      <div className="cities-suggestions">
        {placesData.map(data => (
          <span key={data.lat} onClick={() => handleSelectCity(data)}>
            {data.display_name || data.name}
          </span>
        ))}
      </div>

    </Content>
  );
}
