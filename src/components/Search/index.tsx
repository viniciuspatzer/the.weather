import { useState, useEffect, useRef, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi'

import { waitUntil } from '../../utils/functions'
import { getRandomCitiesArr } from '../../helpers/functions'
import { LOCATION_IQ_API_URL_AUTO } from '../../config/api'
import axios from 'axios'

import { PlacesAPI, Place } from '../../types/interfaces'

import { Content } from "./styles";

interface SidebarProps {
  setCurrentPlace: (params: Place) => void;
}

export function Search({ setCurrentPlace }: SidebarProps) {
  const [placesData, setPlacesData] = useState<Place[]>([]);
  const [error, setError] = useState(false);
  const placesDataRef = useRef<Place[]>([]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const throttling = useRef(false);
  const fetching = useRef(true);

  useEffect(() => {
    (function getFirstSuggestedPlaces() {
      const places = getRandomCitiesArr(4);
      setPlacesData(places);
    })();
  }, []);

  async function handleSelectCity(data: Place)  {
    inputRef.current.value = data.name;
    setCurrentPlace(data);
  }

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    await waitUntil(() => fetching.current === false);
    handleSelectCity(placesDataRef.current[0]);
  }

  function handleThrottleSearch() {
    const inputValue = inputRef.current.value.trim();
    if (throttling.current || !inputValue) return;
    throttling.current = true;

    setTimeout(async () => {
      if (!inputValue) return;

      try {
        setError(false);
        throttling.current = false;
        fetching.current = true;
        const response = await axios.get(`${LOCATION_IQ_API_URL_AUTO}&q=${inputRef.current.value}`);
        const data = response.data.map((data: PlacesAPI) => {
          const {name, state, country} = data.address;
          const { lat, lon } = data;
          return {
            name,
            display_name: `${name}, ${state ? state + ',' : ''} ${country}`,
            lat,
            lon,
          };
        });
        setPlacesData(data);
        placesDataRef.current = data;

      } catch(err) {
        setError(true);
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

      {error ? (
        <div className="error-container">
          We didn't find any results.
        </div>
      ) : (
        <div className="cities-suggestions">
          {placesData.map((data) => (
            <span key={data.lat} onClick={() => handleSelectCity(data)}>
              {data.display_name || data.name}
            </span>
          ))}
        </div>
      )}
    </Content>
  );
}