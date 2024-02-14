'use strict';
// Weather Icons
const pathWeatherIcon = 'assets/images/weather-icons/';
export const weatherIconCont = {
  thunderstorm: pathWeatherIcon + 'thunderstorms-extreme.svg',
  drizzle: pathWeatherIcon + 'drizzle.svg',
  rain: pathWeatherIcon + 'rain.svg',
  snow: pathWeatherIcon + 'snow.svg',
  mist: pathWeatherIcon + 'mist.svg',
  smoke: pathWeatherIcon + 'smoke.svg',
  haze: pathWeatherIcon + 'haze.svg',
  dust: pathWeatherIcon + 'dust.svg',
  fog: pathWeatherIcon + 'fog.svg',
  sand: pathWeatherIcon + 'dust.svg',
  ash: pathWeatherIcon + 'dust.svg',
  squalls: pathWeatherIcon + 'hurricane.svg',
  tornado: pathWeatherIcon + 'tornado.svg',
  clear: pathWeatherIcon + 'clear.svg',
  clouds: pathWeatherIcon + 'clouds.svg',
};

// Feels Like Temp Icons
const pathFeelsLikeIcon = 'assets/images/misc-icons/';
const feelsLikeCont = {
  thermometerColder: pathFeelsLikeIcon + 'thermometer-colder.svg',
  thermometerWarmer: pathFeelsLikeIcon + 'thermometer-warmer.svg',
  thermometerNormal: pathFeelsLikeIcon + 'thermometer.svg',
};

// Wind Speed Icons
const pathWindIcon = 'assets/images/weather-details/';
const windSpeedCont = {
  calm: pathWindIcon + 'wind-beaufort-0.svg',
  lightAir: pathWindIcon + 'wind-beaufort-1.svg',
  lightBreeze: pathWindIcon + 'wind-beaufort-2.svg',
  gentleBreeze: pathWindIcon + 'wind-beaufort-3.svg',
  moderateBreeze: pathWindIcon + 'wind-beaufort-4.svg',
  freshBreeze: pathWindIcon + 'wind-beaufort-5.svg',
  strongBreeze: pathWindIcon + 'wind-beaufort-6.svg',
  nearGale: pathWindIcon + 'wind-beaufort-7.svg',
  gale: pathWindIcon + 'wind-beaufort-8.svg',
  strongGale: pathWindIcon + 'wind-beaufort-9.svg',
  storm: pathWindIcon + 'wind-beaufort-10.svg',
  violentStorm: pathWindIcon + 'wind-beaufort-11.svg',
  hurricane: pathWindIcon + 'wind-beaufort-12.svg',
};

// Atmospheric Pressure
const pathPressureIcon = 'assets/images/weather-details/';
const pressureCont = {
  pressureLow: pathPressureIcon + 'pressure-low.svg',
  pressureHigh: pathPressureIcon + 'pressure-high.svg',
  pressureAvg: pathPressureIcon + 'barometer.svg',
};

// Compass Sector
const compassSector = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];

// Merged Resources
const resources = {
  weatherIconCont,
  windSpeedCont,
  feelsLikeCont,
  pressureCont,
  compassSector,
};

// Exported module
export { resources as default };
