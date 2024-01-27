// Logo DOM Element
const logo = document.querySelector('.weatherly-logo');

// -------------------------------------------------

// Navigation DOM Elements
const cityInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

// -------------------------------------------------

// Weather Overview DOM Elements

// City and Country
const weatherLocation = document.querySelector('.location');
const weatherCountry = document.querySelector('.country');

// Weather Description
const weatherDesc = document.querySelector('.weather-desc');

// Weather Icon
const weatherIcon = document.querySelector('.weather-icon');

// Temperature
const temperature = document.querySelector('.temperature');
const tempUnit = document.querySelector('.temp-unit');
const tempDetails = document.querySelector('.temp-details');
const tempDetailsUnit = document.querySelector('.temp-details-unit');

// -------------------------------------------------

// Weather Details DOM Eelements

// Wind Direction
const windDirection = document.querySelector('.wind-direction-text');

// Humidity
const humidity = document.querySelector('.humidity-text');
const humidityUnit = document.querySelector('.humidity-unit');

// Wind Speed
const windSpeed = document.querySelector('.wind-speed-text');
const windSpeedUnit = document.querySelector('.wind-speed-unit');

// Pressure
const pressure = document.querySelector('.pressure-text');
const pressureUnit = document.querySelector('.pressure-unit');

// Sunrise & Sunset
const sunriseTime = document.querySelector('.sunrise-text');
const sunsetTime = document.querySelector('.sunset-time');

// -------------------------------------------------

// Open Weather API
const apiKey = 'a6efd444d5287faaebffb105784f5590';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const apiIcon = 'https://openweathermap.org/img/wn/';

// -------------------------------------------------

// Get Current Weather
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (!response.ok) {
    throw new Error('City not found!');
  }
  let data = await response.json();
  console.log(data);

  // Show weather location and country
  weatherLocation.textContent = data.name;
  weatherCountry.textContent = `, ${data.sys.country}`;
  weatherLocation.appendChild(weatherCountry);

  // Show weather description
  weatherDesc.textContent = data.weather[0].description;

  // Show weather icon
  let weatherCondition = data.weather[0].main;
  let weatherImage = data.weather[0].icon;
  let apiIcon = `https://openweathermap.org/img/wn/${weatherImage}@2x.png`;

  if (weatherCondition == 'Thunderstorm') {
    weatherIcon.src = 'assets/images/weather-icons/thunderstorms-extreme.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Drizzle') {
    weatherIcon.src = 'assets/images/weather-icons/drizzle.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Rain') {
    weatherIcon.src = 'assets/images/weather-icons/rain.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Snow') {
    weatherIcon.src = 'assets/images/weather-icons/snow.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Mist') {
    weatherIcon.src = 'assets/images/weather-icons/mist.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Clear') {
    weatherIcon.src = 'assets/images/weather-icons/clear.svg';
    logo.src = apiIcon;
  } else if (weatherCondition == 'Clouds') {
    weatherIcon.src = 'assets/images/weather-icons/clouds.svg';
    logo.src = apiIcon;
  } else {
    throw new Error('Weather not found!');
  }

  // Show weather temperature in celcius
  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  // Show weather details 'Feels like...'
  const feelsLike = (tempDetailsUnit.textContent = Math.round(
    data.main.feels_like
  ));
  tempDetails.textContent = `Feels like ${feelsLike}°C`;

  // TODO: Change icon when the temperature more than or lower than 15 °C

  // Show wind direction
  let compassSector = [
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

  windDirection.textContent = compassSector[(data.wind.deg / 22.5).toFixed(0)];

  // Show humidity
  humidity.textContent = data.main.humidity;
  humidityUnit.textContent = ' %';
  humidity.appendChild(humidityUnit);

  // Show wind speed
  windSpeed.textContent = data.wind.speed;
  windSpeedUnit.textContent = ' m/s';
  windSpeed.appendChild(windSpeedUnit);

  // Show pressure
  pressure.textContent = data.main.pressure;
  pressureUnit.textContent = ' hPa';
  pressure.appendChild(pressureUnit);

  //TODO: Change icon when the pressure is lower or higher than 1013hPa

  // Show sunrise and sunset
  const { sunrise } = data.sys;
  const { sunset } = data.sys;

  const locale = 'en-ID';

  // Convert UNIX timestamps to Date objects
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  // Format times in readable format
  const formattedSunrise = sunriseDate.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedSunset = sunsetDate.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  sunriseTime.textContent = formattedSunrise;
  sunsetTime.textContent = formattedSunset;
}

// -------------------------------------------------

// Default weather on page load
window.addEventListener('load', () => {
  checkWeather('Yogyakarta');
});

// -------------------------------------------------

// Search a city name
searchBtn.addEventListener('click', () => {
  if (cityInput.value === '') {
    checkWeather('Yogyakarta');
  } else if (cityInput.value) {
    checkWeather(cityInput.value);
    cityInput.value = '';
  } else {
    checkWeather('Yogyakarta');
    cityInput.value = '';
  }
});

cityInput.addEventListener('keydown', (enter) => {
  if (enter.key === 'Enter') {
    if (cityInput.value === '') {
      checkWeather('Yogyakarta');
    } else if (cityInput.value) {
      checkWeather(cityInput.value);
      cityInput.value = '';
    } else {
      checkWeather('Yogyakarta');
      cityInput.value = '';
    }
  }
});
