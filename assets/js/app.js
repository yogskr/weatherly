'use strict';

// Import weather icons from icon-resources.js module
import resources from './icon-resources.js';

// -------------------------------------------------

// DOM querySelector
function querySelector(elm) {
  return document.querySelector(elm);
}

// -------------------------------------------------

// Logo DOM Element
const logo = querySelector('.weatherly-logo');

// -------------------------------------------------

// Navigation DOM Elements
const cityInput = querySelector('.search-bar');
const searchBtn = querySelector('.search-button');
const locationBtn = querySelector('.location-button');

// -------------------------------------------------

// Weather Overview DOM Elements

// City and Country
const weatherLocation = querySelector('.location');
const weatherCountry = querySelector('.country');

// Weather Description
const weatherDesc = querySelector('.weather-desc');

// Weather Icon
const weatherIcon = querySelector('.weather-icon');

// Temperature
const temperature = querySelector('.temperature');
const tempDetails = querySelector('.temp-details');

// Feels Like Temp Icon
const feelsLikeIcon = querySelector('.feels-like-icon');

// -------------------------------------------------

// Weather Details DOM Eelements

// Wind Direction
const windDirection = querySelector('.wind-direction-text');

// Humidity
const humidityTxt = querySelector('.humidity-text');
const humidityDesc = querySelector('.humidity-desc');
const humidityUnit = querySelector('.humidity-unit');

// Wind Speed
const windSpeedTxt = querySelector('.wind-speed-text');
const windSpeedDesc = querySelector('.wind-speed-desc');
const windSpeedUnit = querySelector('.wind-speed-unit');
const windSpeedImg = querySelector('.wind-speed');

// Pressure
const pressureTxt = querySelector('.pressure-text');
const pressureDesc = querySelector('.pressure-desc');
const pressureUnit = querySelector('.pressure-unit');
const pressureImg = querySelector('.pressure');

// Sunrise & Sunset
const sunriseTime = querySelector('.sunrise-text');
const sunsetTime = querySelector('.sunset-text');

// -------------------------------------------------

// Footer DOM Elements
const getTime = querySelector('.time');

// Open Weather API
const apiKey = 'a6efd444d5287faaebffb105784f5590';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiIcon = 'https://openweathermap.org/img/wn/';

// Loader DOM Element
const loader = querySelector('.loading-dot');
const loaderTxt = document.querySelectorAll('.loading-dot-text');

// -------------------------------------------------

// Get Current Weather
async function checkWeather(city, latitude, longitude) {
  loading();
  try {
    const response = await fetch(
      apiUrl + `&q=${city}&${latitude}&${longitude}&appid=${apiKey}`
    );

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
      weatherIcon.src = resources.weatherIconCont.thunderstorm;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Drizzle') {
      weatherIcon.src = resources.weatherIconCont.drizzle;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Rain') {
      weatherIcon.src = resources.weatherIconCont.rain;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Snow') {
      weatherIcon.src = resources.weatherIconCont.snow;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Mist') {
      weatherIcon.src = resources.weatherIconCont.mist;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Smoke') {
      weatherIcon.src = resources.weatherIconCont.smoke;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Haze') {
      weatherIcon.src = resources.weatherIconCont.haze;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Dust') {
      weatherIcon.src = resources.weatherIconCont.dust;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Fog') {
      weatherIcon.src = resources.weatherIconCont.fog;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Sand') {
      weatherIcon.src = resources.weatherIconCont.sand;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Ash') {
      weatherIcon.src = resources.weatherIconCont.ash;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Squalls') {
      weatherIcon.src = resources.weatherIconCont.squalls;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Tornado') {
      weatherIcon.src = resources.weatherIconCont.tornado;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Clear') {
      weatherIcon.src = resources.weatherIconCont.clear;
      logo.src = apiIcon;
    } else if (weatherCondition == 'Clouds') {
      weatherIcon.src = resources.weatherIconCont.clouds;
      logo.src = apiIcon;
    } else {
      throw new Error('Weather not found!');
    }

    // Show weather temperature in celcius
    const realTemp = data.main.temp;
    const feelsLikeTemp = data.main.feels_like;

    temperature.textContent = `${realTemp.toFixed()}°C`;

    // Show weather details 'Feels like...'
    tempDetails.textContent = `Feels like ${feelsLikeTemp.toFixed()}°C`;

    // Change icon when the the feels like temperature higher or lower than real temperature °C

    if (feelsLikeTemp < realTemp) {
      feelsLikeIcon.src = resources.feelsLikeCont.thermometerColder;
    } else if (feelsLikeTemp > realTemp) {
      feelsLikeIcon.src = resources.feelsLikeCont.thermometerWarmer;
    } else if (feelsLikeTemp === realTemp) {
      feelsLikeIcon.src = resources.feelsLikeCont.thermometerNormal;
    }

    // Show wind direction
    windDirection.textContent =
      resources.compassSector[(data.wind.deg / 22.5).toFixed()];

    // Show humidity
    const humidityData = data.main.humidity;
    humidityTxt.textContent = humidityData;
    humidityUnit.textContent = ' %';
    humidityTxt.appendChild(humidityUnit);

    /*
    <25 = too dry
    26-29 = dry
    30-60 = optimal
    61-69 = humid
    >70 = too humid
    */

    if (humidityData <= 25) {
      humidityDesc.textContent = 'Arid';
    } else if (humidityData >= 26 && humidityData <= 29) {
      humidityDesc.textContent = 'Dry';
    } else if (humidityData >= 30 && humidityData <= 60) {
      humidityDesc.textContent = 'Comfortable';
    } else if (humidityData >= 61 && humidityData <= 69) {
      humidityDesc.textContent = 'Humid';
    } else if (humidityData >= 70 && humidityData <= 90) {
      humidityDesc.textContent = 'Moist';
    } else if (humidityData >= 91) {
      humidityDesc.textContent = 'Wet';
    }

    // Show wind speed
    const windSpeed = data.wind.speed * 3.6;
    const windScale = windSpeed.toFixed(1);

    windSpeedTxt.textContent = windScale;
    windSpeedUnit.textContent = ' km/h';
    windSpeedTxt.appendChild(windSpeedUnit);

    // Change wind speed icon according to wind beaufort scale
    if (windScale < 1) {
      windSpeedImg.src = resources.windSpeedCont.calm;
      windSpeedDesc.textContent = 'Calm';
    } else if (windScale >= 1 && windScale <= 5) {
      windSpeedImg.src = resources.windSpeedCont.lightAir;
      windSpeedDesc.textContent = 'Light Air';
    } else if (windScale >= 6 && windScale <= 11) {
      windSpeedImg.src = resources.windSpeedCont.lightBreeze;
      windSpeedDesc.textContent = 'Light Breeze';
    } else if (windScale >= 12 && windScale <= 19) {
      windSpeedImg.src = resources.windSpeedCont.gentleBreeze;
      windSpeedDesc.textContent = 'Gentle Breeze';
    } else if (windScale >= 20 && windScale <= 28) {
      windSpeedImg.src = resources.windSpeedCont.moderateBreeze;
      windSpeedDesc.textContent = 'Moderate Breeze';
    } else if (windScale >= 29 && windScale <= 38) {
      windSpeedImg.src = resources.windSpeedCont.freshBreeze;
      windSpeedDesc.textContent = 'Fresh Breeze';
    } else if (windScale >= 39 && windScale <= 49) {
      windSpeedImg.src = resources.windSpeedCont.strongBreeze;
      windSpeedDesc.textContent = 'Strong Breeze';
    } else if (windScale >= 50 && windScale <= 61) {
      windSpeedImg.src = resources.windSpeedCont.nearGale;
      windSpeedDesc.textContent = 'Near Gale';
    } else if (windScale >= 62 && windScale <= 74) {
      windSpeedImg.src = resources.windSpeedCont.gale;
      windSpeedDesc.textContent = 'Gale';
    } else if (windScale >= 75 && windScale <= 88) {
      windSpeedImg.src = resources.windSpeedCont.strongGale;
      windSpeedDesc.textContent = 'Strong Gale';
    } else if (windScale >= 89 && windScale <= 102) {
      windSpeedImg.src = resources.windSpeedCont.storm;
      windSpeedDesc.textContent = 'Storm';
    } else if (windScale >= 103 && windScale <= 117) {
      windSpeedImg.src = resources.windSpeedCont.violentStorm;
      windSpeedDesc.textContent = 'Violent Storm';
    } else if (windScale > 118) {
      windSpeedImg.src = resources.windSpeedCont.hurricane;
      windSpeedDesc.textContent = 'Hurricane';
    }

    // Show pressure
    const pressureData = data.main.pressure;
    pressureTxt.textContent = pressureData;
    pressureUnit.textContent = ' hPa';
    pressureTxt.appendChild(pressureUnit);

    //Change icon when the pressure is lower or higher than 1013hPa
    const avgPressure = 1017;
    if (pressureData < avgPressure) {
      pressureImg.src = resources.pressureCont.pressureLow;
      pressureDesc.textContent = 'Lower Air Pressure';
    } else if (pressureData > avgPressure) {
      pressureImg.src = resources.pressureCont.pressureHigh;
      pressureDesc.textContent = 'Higher Air Pressure';
    } else if (pressureData === avgPressure) {
      pressureImg.src = resources.pressureCont.pressureAvg;
    }

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

    // Show current time
    const unixDate = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const longFormatDate = unixDate.toLocaleDateString(locale, options);

    getTime.textContent = longFormatDate;
  } catch (error) {
    console.error('Cannot fetch the weather because:', error);
  }
  complete();
}

// -------------------------------------------------

// Get user's current weather
function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const reverseGeocodongUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

      fetch(reverseGeocodongUrl)
        .then((response) => response.json())
        .then((data) => {
          const { name } = data[0];
          checkWeather(name, latitude, longitude);
        })
        .catch(() => {
          alert('An error occured while fetching the city!');
        });
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        alert(
          'Geolocation request denied. Please reset location permission to grant access again.'
        );
      }
    }
  );
}

// Show current weather on page load
checkWeather('Yogyakarta');

// Show weather using getUserCoordinate()
locationBtn.addEventListener('click', getUserCoordinates);

// -------------------------------------------------

// Search a city name on mouse click
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

// Search a city name on presskey (Enter)
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

// -------------------------------------------------

// Show Loader
function loading() {
  loader.hidden = false;
  for (const eachLoader of loaderTxt) {
    eachLoader.hidden = false;
  }
  weatherIcon.hidden = true;
  windDirection.hidden = true;
  humidityTxt.hidden = true;
}

// Hide Loader
function complete() {
  weatherIcon.hidden = false;
  windDirection.hidden = false;
  humidityTxt.hidden = false;
  loader.hidden = true;
  for (const eachLoader of loaderTxt) {
    eachLoader.hidden = true;
  }
}
