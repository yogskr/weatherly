// Logo DOM Element
const logo = document.querySelector('.weatherly-logo');

// -------------------------------------------------

// Navigation DOM Elements
const cityInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');
const locationBtn = document.querySelector('.location-button');

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

// Feels Like Temp Icon
const feelsLikeIcon = document.querySelector('.feels-like-icon');

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
const sunsetTime = document.querySelector('.sunset-text');

// -------------------------------------------------

// Footer DOM Elements
const getTime = document.querySelector('.time');

// Open Weather API
const apiKey = 'a6efd444d5287faaebffb105784f5590';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiIcon = 'https://openweathermap.org/img/wn/';

// Loader DOM Element
const loader = document.querySelector('.loading-dot');
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
    const realTemp = data.main.temp;
    const feelsLikeTemp = data.main.feels_like;

    if (feelsLikeTemp < realTemp) {
      feelsLikeIcon.src = 'assets/images/misc-icons/thermometer-colder.svg';
    } else if (feelsLikeTemp > realTemp) {
      feelsLikeIcon.src = 'assets/images/misc-icons/thermometer-warmer.svg';
    } else {
      feelsLikeIcon.src = 'initial';
    }

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

    windDirection.textContent =
      compassSector[(data.wind.deg / 22.5).toFixed(0)];

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
    console.error(error);
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
window.addEventListener('load', checkWeather('Yogyakarta'));

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
  humidity.hidden = true;
}

// Hide Loader
function complete() {
  weatherIcon.hidden = false;
  windDirection.hidden = false;
  humidity.hidden = false;
  loader.hidden = true;
  for (const eachLoader of loaderTxt) {
    eachLoader.hidden = true;
  }
}
