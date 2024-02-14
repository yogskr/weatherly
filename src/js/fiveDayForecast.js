import { weatherIconCont } from './components/iconResources.js';

// Five Day Forecast DOM Elements
const forecastItemCont = document.querySelector('.forecast-item-container');

// TODO: Fetch 5 Days Forecast
const API_KEY = 'a6efd444d5287faaebffb105784f5590';
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric`;

// Store the last valid city
let lastValidCity = '';

export default async function fiveDayForecast(
  city,
  countryCode,
  latitude,
  longitude
) {
  try {
    // Imported modules
    const capitalizedWeatherDesc = await import(
      './components/capitalizeLetter.js'
    );

    // Fetch data from Open Weather API
    const response = await fetch(
      API_URL + `&q=${city}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error(response.status);

    let data = await response.json();
    const forecastData = data.list.filter((entry) =>
      entry.dt_txt.includes('18:00:00')
    );

    // Update last valid city
    lastValidCity = city;

    // Show five day forecast
    forecastData.forEach((entry) => {
      // Date and time
      const getDate = new Date(entry.dt * 1000);
      const locale = 'en-US';

      const day = getDate.toLocaleDateString(locale, {
        weekday: 'long',
      });
      const date = getDate.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
      });

      // Weather icons
      const weatherCondition = entry.weather[0].main;

      const weatherIcons = {
        Thunderstorm: weatherIconCont.thunderstorm,
        Drizzle: weatherIconCont.drizzle,
        Rain: weatherIconCont.rain,
        Snow: weatherIconCont.snow,
        Mist: weatherIconCont.mist,
        Smoke: weatherIconCont.smoke,
        Haze: weatherIconCont.haze,
        Dust: weatherIconCont.dust,
        Fog: weatherIconCont.fog,
        Sand: weatherIconCont.sand,
        Ash: weatherIconCont.ash,
        Squalls: weatherIconCont.squalls,
        Tornado: weatherIconCont.tornado,
        Clear: weatherIconCont.clear,
        Clouds: weatherIconCont.clouds,
      };

      function weatherImgSrc() {
        if (weatherIcons.hasOwnProperty(weatherCondition)) {
          return weatherIcons[weatherCondition];
        }
      }

      // Temperature
      const temperature = entry.main.temp;

      // Weather description
      const description = entry.weather[0].description;

      // Create HTML elenments
      const forecastEntry = document.createElement('div');
      forecastEntry.setAttribute('class', 'forecast-item');
      forecastEntry.innerHTML = `
        <h3>${day}</h3>
        <h4>${date}</h4>
        <img src=${weatherImgSrc()} />
        <p class="forecast-temp">${Math.round(temperature)}°C</p>
        <p class="forecast-desc">${capitalizedWeatherDesc.upperCase(
          description
        )}</p>
      `;

      forecastItemCont.appendChild(forecastEntry);
    });
  } catch (error) {
    console.log('Fetching error', error);

    if (lastValidCity) {
      await fiveDayForecast(lastValidCity);
    }
  }
}
