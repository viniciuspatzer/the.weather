// LOCATION IQ API
export const LOCATION_IQ_API_URL_AUTO = 
`https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&limit=4&tag=place:city,place:town,place:village&dedupe=1`;


// OPEN WHEATER API
export const WEATHER_API_URL = 
`https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&exclude=minutely,alerts`;