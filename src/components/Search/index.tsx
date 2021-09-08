import { useState, useRef } from 'react';
import { Content } from "./styles";
import { FiSearch } from 'react-icons/fi'
import { LOCATION_IQ_API_URL } from '../../config/api'

interface Coords {
  lat: string;
  lon: string;
}

interface CitiesOriginalData {
  address: {
    name: string;
    city: string;
    state: string;
    country: string;
  }
  lat: string;
  lon: string;
}

interface CitiesFormattedData {
  city: string;
  state: string;
  country: string;
  displayName: string;
  coords: Coords;
}

export function Search() {
  const [citiesData, setCitiesData] = useState<CitiesFormattedData[]>([]);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const throttling = useRef(false);

  function handleClickCitySuggestion(data: CitiesFormattedData)  {
    return null;
  }

  function handleThrottleSearch() {
    if (throttling.current || !inputRef.current || !inputRef.current.value.trim()) {
      return;
    }
    
    throttling.current = true;

    setTimeout(async () => {
      throttling.current = false;

      if (inputRef.current.value.length < 3) {
        return;
      }

      try {
        const response = await fetch(`${LOCATION_IQ_API_URL}&q=${inputRef.current.value}`);
      
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        console.log(data);

        const formattedData = data.map((obj: CitiesOriginalData) => {
          return {
            city: obj.address.city || obj.address.name,
            state: obj.address.state,
            country: obj.address.country,
            displayName: `${obj.address.city || obj.address.name}, ${obj.address.state}, ${obj.address.country}`,
            coords: {
              lat: obj.lat,
              lon: obj.lon
            }
          };
        });
        
        setCitiesData(formattedData);

      } catch(err) {
        console.error(err);
      }
    }, 500);
  }

  return (
    <Content>

      <form className="search-bar">
        <input
          type="text"
          placeholder="Another location"
          ref={inputRef}
          onChange={handleThrottleSearch}
        />
        <div className="icon-box">
          <FiSearch color="#000" size="30px" />
        </div>
      </form>

      <div className="cities-suggestions">
        {citiesData.map((data) => (
          <span
            onClick={() => handleClickCitySuggestion(data)}
            key={data.coords.lat}
          >
            {data.displayName}
          </span>
        ))}
      </div>

    </Content>
  );
}
