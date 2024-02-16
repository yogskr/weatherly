'use strict';

import fiveDayForecast from './fiveDayForecast.js';
import resources from './components/iconResources.js';

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

// Loader DOM Element
const loader = querySelector('.loading-dot');
const loaderTxt = document.querySelectorAll('.loading-dot-text');

// -------------------------------------------------

// Modal WIndow DOM Elements
const emptyInput = querySelector('.warning-1');
const warningMsgTxt = querySelector('.warning-1-text');
const errorInput = querySelector('.warning-2');
const errorMsgTxt = querySelector('.warning-2-text');
const overlay = querySelector('.overlay');

// -------------------------------------------------

// Five Day Forecast DOM Elements

const arrowDownBtn = querySelector('.five-day-forecast-button');
const arrowDownIcon = querySelector('.arrow-down-icon');
const buttonText = querySelector('.button-text');

const forecastItemCont = querySelector('.forecast-item-container');

// -------------------------------------------------

// Get Current Weather
const API_KEY = process.env.weatherApiKey;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

async function checkWeather(city, latitude, longitude) {
  // Error messages
  const wrongInput =
    'The city is not found. Please check your spelling and try again.';
  const emptyInput = 'The input text cannot be empty! Please try again.';

  // Loading animation
  loading();

  try {
    const response = await fetch(
      API_URL + `&q=${city}&${latitude}&${longitude}&appid=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(wrongInput);
      } else {
        throw new Error(emptyInput);
      }
    }

    let data = await response.json();

    // Show weather icon besdes logo
    let weatherImage = data.weather[0].icon;
    let apiIcon = `https://openweathermap.org/img/wn/${weatherImage}@2x.png`;

    // Show weather location and country
    weatherLocation.textContent = data.name;
    weatherCountry.textContent = `, ${data.sys.country}`;
    weatherLocation.appendChild(weatherCountry);

    // Show weather description
    const capitalizedWeatherDesc = await import(
      './components/capitalizeLetter.js'
    );

    const weatherText = data.weather[0].description;

    weatherDesc.textContent = capitalizedWeatherDesc.upperCase(weatherText);

    // Show weather icon on weather overview
    let weatherCondition = data.weather[0].main;

    const weatherIcons = {
      Thunderstorm: resources.weatherIconCont.thunderstorm,
      Drizzle: resources.weatherIconCont.drizzle,
      Rain: resources.weatherIconCont.rain,
      Snow: resources.weatherIconCont.snow,
      Mist: resources.weatherIconCont.mist,
      Smoke: resources.weatherIconCont.smoke,
      Haze: resources.weatherIconCont.haze,
      Dust: resources.weatherIconCont.dust,
      Fog: resources.weatherIconCont.fog,
      Sand: resources.weatherIconCont.sand,
      Ash: resources.weatherIconCont.ash,
      Squalls: resources.weatherIconCont.squalls,
      Tornado: resources.weatherIconCont.tornado,
      Clear: resources.weatherIconCont.clear,
      Clouds: resources.weatherIconCont.clouds,
    };

    if (weatherIcons.hasOwnProperty(weatherCondition)) {
      weatherIcon.src = weatherIcons[weatherCondition];
      logo.src = apiIcon;
    }

    // Show weather temperature in celcius
    const realTemp = data.main.temp;
    const feelsLikeTemp = data.main.feels_like;

    temperature.textContent = `${realTemp.toFixed()}°C`;

    // Show weather details 'Feels like...'
    tempDetails.textContent = `Feels like  ${feelsLikeTemp.toFixed(1)}°C`;

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

    // Change the humidity text description if the humidity data is on a ceratin level

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
    const windScaleThresholds = [
      { threshold: 1, src: resources.windSpeedCont.calm, desc: 'Calm' },
      {
        threshold: 6,
        src: resources.windSpeedCont.lightAir,
        desc: 'Light Air',
      },
      {
        threshold: 12,
        src: resources.windSpeedCont.lightBreeze,
        desc: 'Light Breeze',
      },
      {
        threshold: 20,
        src: resources.windSpeedCont.gentleBreeze,
        desc: 'Gentle Breeze',
      },
      {
        threshold: 29,
        src: resources.windSpeedCont.moderateBreeze,
        desc: 'Moderate Breeze',
      },
      {
        threshold: 39,
        src: resources.windSpeedCont.freshBreeze,
        desc: 'Fresh Breeze',
      },
      {
        threshold: 50,
        src: resources.windSpeedCont.strongBreeze,
        desc: 'Strong Breeze',
      },
      {
        threshold: 62,
        src: resources.windSpeedCont.nearGale,
        desc: 'Near Gale',
      },
      { threshold: 75, src: resources.windSpeedCont.gale, desc: 'Gale' },
      {
        threshold: 89,
        src: resources.windSpeedCont.strongGale,
        desc: 'Strong Gale',
      },
      { threshold: 103, src: resources.windSpeedCont.storm, desc: 'Storm' },
      {
        threshold: 118,
        src: resources.windSpeedCont.violentStorm,
        desc: 'Violent Storm',
      },
    ];

    function getWindSpeedInfo(windScale) {
      for (let i = 0; i < windScaleThresholds.length; i++) {
        if (windScale < windScaleThresholds[i].threshold) {
          return windScaleThresholds[i];
        }
      }
      // If windScale is greater than the highest threshold
      return { src: resources.windSpeedCont.hurricane, desc: 'Hurricane' };
    }

    const { src, desc } = getWindSpeedInfo(windScale);
    windSpeedImg.src = src;
    windSpeedDesc.textContent = desc;

    // Show pressure
    const pressureData = data.main.pressure;
    pressureTxt.textContent = pressureData;
    pressureUnit.textContent = ' hPa';
    pressureTxt.appendChild(pressureUnit);

    //Change icon when the pressure is lower or higher than 1013hPa
    const avgPressure = 1017;
    if (pressureData < avgPressure) {
      pressureImg.src = resources.pressureCont.pressureLow;
      pressureDesc.textContent = 'Lower Pressure';
    } else if (pressureData > avgPressure) {
      pressureImg.src = resources.pressureCont.pressureHigh;
      pressureDesc.textContent = 'Higher Pressure';
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
    };
    const longFormatDate = unixDate.toLocaleDateString(locale, options);

    getTime.textContent = longFormatDate;

    // Five Day Forecast
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    if (forecastItemCont.innerHTML !== '') {
      forecastItemCont.innerHTML = '';
      fiveDayForecast(city, lat, lon);
    } else {
      fiveDayForecast(city, lat, lon);
    }
  } catch (error) {
    if (error.message === wrongInput) {
      errorMsgTxt.textContent = wrongInput;
      showErrorMsg();
    } else if (error.message === emptyInput) {
      warningMsgTxt.textContent = emptyInput;
      showWarningMsg();
    }
  }
  complete();
}

// -------------------------------------------------

// Show current weather and five day forecast on page load
checkWeather('Yogyakarta');

// Get user's current weather
function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const reverseGeocodongUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

      fetch(reverseGeocodongUrl)
        .then((response) => response.json())
        .then((data) => {
          const { name } = data[0];
          checkWeather(name, latitude, longitude);
          forecastItemCont.innerHTML = '';
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

// Show weather using getUserCoordinate()
locationBtn.addEventListener('click', getUserCoordinates);

// -------------------------------------------------

// Clear warning message
function clearMsg() {
  emptyInput.classList.remove('msg-active');
  errorInput.classList.remove('msg-active');
  overlay.classList.remove('overlay-active');
}

// Show a warning message
function showWarningMsg() {
  emptyInput.classList.add('msg-active');
  overlay.classList.add('overlay-active');
  setTimeout(() => {
    clearMsg();
  }, 2700);
}

// Show an error message
function showErrorMsg() {
  errorInput.classList.add('msg-active');
  overlay.classList.add('overlay-active');
  setTimeout(() => {
    clearMsg();
  }, 2700);
}

// Close modal window when clicked outside its area
overlay.addEventListener('click', () => {
  clearMsg();
});

// Close modal window when pressed Escape
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' ||
    errorInput.classList.contains('msg-active') ||
    overlay.classList.contains('overlay-active')
  ) {
    clearMsg();
  }
});

// -------------------------------------------------

// Search a city name on mouse click
searchBtn.addEventListener('click', async () => {
  await checkWeather(cityInput.value);
  if (forecastItemCont.innerHTML !== '') {
    forecastItemCont.innerHTML = '';
    await fiveDayForecast(cityInput.value);
  }
  cityInput.value = '';
});

// Search a city name on presskey (Enter)
cityInput.addEventListener('keydown', async (enter) => {
  if (enter.key === 'Enter') {
    await checkWeather(cityInput.value);
    if (forecastItemCont.innerHTML !== '') {
      forecastItemCont.innerHTML = '';
      await fiveDayForecast(cityInput.value);
    }
    cityInput.value = '';
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

// Show text when the button is clicked
function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

function eventHandler(event) {
  if (event.type === 'mouseover') {
    arrowDownIcon.classList.add('hide-arrow-down-icon');
    arrowDownBtn.style.width = '12rem';
    buttonText.style.opacity = 1;
    if (arrowDownIcon.classList.contains('rotate-arrow-down-icon')) {
      arrowDownIcon.classList.remove('hide-arrow-down-icon');
      arrowDownBtn.style.width = '';
      buttonText.style.opacity = '';
    }
  } else if (event.type === 'mouseout') {
    arrowDownIcon.classList.remove('hide-arrow-down-icon');
    arrowDownBtn.style.width = '';
    buttonText.style.opacity = '';
  } else if (event.type === 'click') {
    arrowDownIcon.classList.toggle('rotate-arrow-down-icon');
    forecastItemCont.classList.toggle('show-forecast-item-container');
    scrollToTop();
  }
}

arrowDownBtn.addEventListener('mouseover', eventHandler);
arrowDownBtn.addEventListener('mouseout', eventHandler);
arrowDownBtn.addEventListener('click', eventHandler);

// Update copyright year
const copyright = document.querySelector('.copyright-text');

const copyrightYear = new Date().getFullYear();

copyright.textContent = copyrightYear;

// EmailJS
const contactForm = document.getElementById('contact-form');
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userMessage = document.getElementById('message');

const serviceID = 'service_655vpv9';
const templateID = 'template_pnw0bh8';

const emailBtn = document.querySelector('.submit-button');

function sendMail() {
  var params = {
    name: userName.value,
    email: userEmail.value,
    message: userMessage.value,
  };
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    emailjs.send(serviceID, templateID, params).then(
      function () {
        console.log('Success');
        contactForm.reset();
        emailBtn.textContent = 'Sucessfully Sent!';
        setInterval(() => window.location.reload(true), 3000);
      },
      function (error) {
        console.log('Failed', error);
      }
    );
  });
}

emailBtn.addEventListener('click', sendMail);
