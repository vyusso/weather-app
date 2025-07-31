import axios from "axios";

// Fetch weather data for a specific city
export const fetchWeather = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_ID}`
  );
  return res.data;
};

// Fetch weather data using latitude and longitude coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_ID}`
  );
  return res.data;
};
