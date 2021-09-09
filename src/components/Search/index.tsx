import { useState, useRef, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi'

import axios from 'axios'
import { waitUntil } from '../../helpers/waitUntil'
import { LOCATION_IQ_API_URL } from '../../config/api'

import { CitiesOriginalData, CitiesFormattedData } from '../../ts/public-interfaces'

import { Content } from "./styles";


interface SidebarProps {
  setCurrentCity: (params: CitiesFormattedData) => void;
}

export function Search({ setCurrentCity }: SidebarProps) {
  const [citiesData, setCitiesData] = useState<CitiesFormattedData[]>([]);
  const citiesDataRef = useRef<CitiesFormattedData[]>([]);
  
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const throttling = useRef(false);
  const fetching = useRef(true);

  function handleSelectCity(data: CitiesFormattedData)  {
    inputRef.current.value = data.displayName;
    setCurrentCity(data);
  }

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    await waitUntil(() => fetching.current === false);

    handleSelectCity(citiesDataRef.current[0])
  }

  function handleThrottleSearch() {

    if (throttling.current || !inputRef.current.value.trim()) {
      return;
    }

    throttling.current = true;

    setTimeout(async () => {
      throttling.current = false;

      if (!inputRef.current.value.length) {
        return;
      }

      try {
        fetching.current = true;
        const response = await axios.get(`${LOCATION_IQ_API_URL}&q=${inputRef.current.value}`);

        const formattedData = response.data.map((data: CitiesOriginalData) => {
          return {
            city: data.address.city || data.address.name,
            state: data.address.state,
            country: data.address.country,
            displayName: `${data.address.city || data.address.name}, ${data.address.state}, ${data.address.country}`,
            coords: {
              lat: data.lat,
              lon: data.lon
            }
          };
        });
        
        setCitiesData(formattedData);
        citiesDataRef.current = formattedData;
        fetching.current = false;

      } catch(err) {
        console.error(err);
      }
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
        {citiesData.map((data) => (
          <span
            onClick={() => handleSelectCity(data)}
            key={data.coords.lat}
          >
            {data.displayName}
          </span>
        ))}
      </div>

    </Content>
  );
}
