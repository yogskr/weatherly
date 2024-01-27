// Logo DOM Element
const logo = document.querySelector('.weatherly-logo');

// Navigation DOM Elements
const cityInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

// Weather Overview DOM Elements
const weatherLocation = document.querySelector('.location');
const weatherCountry = document.querySelector('.country');
const weatherDesc = document.querySelector('.weather-desc');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const tempUnit = document.querySelector('.temp-unit');
const tempDetails = document.querySelector('.temp-details');
const tempDetailsUnit = document.querySelector('.temp-details-unit');

// Weather Details DOM Eelements
const sunriseTime = document.querySelector('.sunrise-text');
const sunsetTime = document.querySelector('.sunset-time');

// Open Weather API
const apiKey = 'a6efd444d5287faaebffb105784f5590';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const apiIcon = 'https://openweathermap.org/img/wn/';

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
  temperature.textContent = Math.round(data.main.temp);
  tempUnit.textContent = '°C';
  temperature.appendChild(tempUnit);

  // Show weather details 'Feels like...'
  tempDetails.textContent = `Feels like ${Math.round(data.main.feels_like)}`;
  tempDetailsUnit.textContent = '°C';
  tempDetails.appendChild(tempDetailsUnit);

  // Show wind direction

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

  sunriseTime.textContent = `${formattedSunrise}`;
  sunsetTime.textContent = `${formattedSunset}`;
}

// Get current weather
window.addEventListener('load', () => {
  checkWeather('Yogyakarta');
});

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
