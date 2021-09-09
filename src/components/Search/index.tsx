import { useState, useEffect, useRef, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi'

import axios from 'axios'
import { waitUntil, randomNumberInterval } from '../../helpers/functions'
import { LOCATION_IQ_API_URL } from '../../config/api'

import { PlacesDataAPI } from '../../ts/public-interfaces'

import { Content } from "./styles";


interface SidebarProps {
  setCurrentCity: (params: PlacesDataAPI) => void;
}

export function Search({ setCurrentCity }: SidebarProps) {
  const [citiesData, setCitiesData] = useState<PlacesDataAPI[]>([]);
  const citiesDataRef = useRef<PlacesDataAPI[]>([]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const throttling = useRef(false);
  const fetching = useRef(true);

  useEffect(() => {
    const countries = ['United States', 'Canada', 'Brazil'];

    (async () => {
      try {
        const response = await axios.get(`${LOCATION_IQ_API_URL}&q=${countries[randomNumberInterval(0, countries.length)]}`);
        const data = response.data.map((data: PlacesDataAPI) => {
          return {
            ...data,
            address: {
              ...data.address,
              displayName: `${data.address.city || data.address.name}, ${data.address.state}, ${data.address.country}`
            }
          };
        });

        // os dados finais precisam ter o mesmo formato....
        setCitiesData(data);
  
      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

  function handleSelectCity(data: PlacesDataAPI)  {
    inputRef.current.value = data.address.displayName;
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
      if (!inputRef.current.value.trim()) {
        return;
      }
      throttling.current = false;
      fetching.current = true;
      
      try {
        const response = await axios.get(`${LOCATION_IQ_API_URL}&q=${inputRef.current.value}`);
        const data = response.data.map((data: PlacesDataAPI) => {
          return {
            ...data,
            address: {
              ...data.address,
              displayName: `${data.address.city || data.address.name}, ${data.address.state}, ${data.address.country}`
            }
          };
        });
        setCitiesData(data);
        citiesDataRef.current = data;

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
        {citiesData.map((data) => (
          <span key={data.lat} onClick={() => handleSelectCity(data)}>
            {data.address.displayName}
          </span>
        ))}
      </div>

    </Content>
  );
}
