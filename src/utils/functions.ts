export const randomNumber = function(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomCityName = function() {
  const places = ['London', 'Amsterdam', 'Manchester', 'New York', 'Orlando', 'Montreal', 'Vancouver', 'Prague', 'Porto', 'Barcelona', 'Rio de Janeiro', 'Tokyo', 'Los Angeles', 'Miami', 'Chicago', 'Sydney', 'Shangai', 'Madrid', 'Mexico City', 'Hong Kong', 'Tel Aviv', 'Lisbon', 'Sao Paulo', 'Bowton', 'Milan', 'Singapore', 'Hanoi', 'Paris', 'Moscow', 'Dubai', 'Budapest', 'Buenos Aires', 'Istanbul', 'Rome', 'Bangkok', 'Seoul'];
  return places[randomNumber(0, places.length)];
}

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
export const waitUntil = async (f: () => boolean) => {
  let counter = 0;
  while (!f() || counter < 2) {
    if (!f()) {
      await sleep(100);
      counter = 0;
    } else {
      await sleep(100);
      counter++;
    }
  }
  return f();
};