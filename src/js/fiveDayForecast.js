// TODO: Fetch 5 Days Forecast
const API_KEY = 'a6efd444d5287faaebffb105784f5590';
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?`;

export default async function fiveDaysForecast(latitude, longitude) {
  try {
    const response = await fetch(
      API_URL + `lat=${latitude}&lon=${longitude}&cnt=5&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error(response.status);

    let data = await response.json();

    const forecastList = data.list;
    console.log(forecastList);

    forecastList.map((item) => ({
      date: item.dt,
      description: item.weather[0].description,
      temp: Math.round(item.main.temp),
    }));
  } catch (error) {
    console.log('Fetching error', error);
  }
}
