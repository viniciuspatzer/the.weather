// LOCATION IQ API
const LOCATION_IQ_API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY;
const LOCATION_IQ_API_PARAMETERS = '&limit=4&tag=place:city,place:town,place:village&dedupe=1';

export const LOCATION_IQ_API_URL = 
`https://api.locationiq.com/v1/autocomplete.php?key=${LOCATION_IQ_API_KEY}${LOCATION_IQ_API_PARAMETERS}`;


// OPEN WHEATER API
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const WEATHER_API_URL = 
`https://api.openweathermap.org/data/2.5/onecall?appid=${WEATHER_API_KEY}`;