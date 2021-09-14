import { defaultCities } from '../config/data'
import { randomNumber } from '../utils/functions'

import { Place } from "../types/interfaces";

export const getRandomCitiesArr = function(quantity: number) {
  const cities = [] as Place[];

  while (cities.length < quantity) {
    const place = defaultCities[randomNumber(0, defaultCities.length - 1)];
    
    if (!cities.includes(place)) {
      cities.push(place);
    }
  }

  return cities
}