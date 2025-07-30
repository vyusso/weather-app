import React from "react";
import { useState, useEffect } from "react";
import style from "./Weather.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export default function Weather() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("New York");
  const iconMap = {
    clear: "/weatherImg/clear.png",
    cloud: "/weatherImg/cloud.png",
    drizzle: "/weatherImg/drizzle.png",
    rain: "/weatherImg/rain.png",
    snow: "/weatherImg/snow.png",
  };

  const fetchWeather = async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_ID}`
    );
    return res.data;
  };

  const handleSearch = () => {
    if (!inputCity.trim()) return;
    setCity(inputCity);
    refetch();
  };

  const getIcon = (desc) => {
    if (!desc) return iconMap.clear;
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.includes("clear")) return iconMap.clear;
    if (lowerDesc.includes("clouds")) return iconMap.cloud;
    if (lowerDesc.includes("drizzle")) return iconMap.drizzle;
    if (lowerDesc.includes("rain")) return iconMap.rain;
    if (lowerDesc.includes("thunderstorm")) return iconMap.rain;
    if (lowerDesc.includes("mist")) return iconMap.rain;
    if (lowerDesc.includes("snow")) return iconMap.snow;
    return iconMap.clear;
  };

  const [tempType, setTempType] = useState(true);
  const toggleTempType = (isFarenheit) => setTempType(isFarenheit);

  const {
    data: weather,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const weatherData = weather
    ? {
        tempC: Math.floor(weather.main.temp).toString() + "°C",
        tempF: Math.floor(weather.main.temp * 1.8 + 32).toString() + "°F",
        city: weather.name,
        humidity: weather.main.humidity,
        wind: Math.round(weather.wind.speed * 3.6),
        description: weather.weather[0].main,
      }
    : null;

  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);

  return (
    <div className={style.weatherContainer}>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setInputCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className={style.weatherImage}>
        <img
          src={getIcon(weatherData?.description)}
          alt="Weather"
          width="180px"
          height="180px"
        />
      </div>

      <div className={style.weatherInfo}>
        <h1>
          {tempType ? weatherData?.tempF ?? "0°F" : weatherData?.tempC ?? "0°C"}
        </h1>
        <div className={style.tempType}>
          <button onClick={() => toggleTempType(false)}>C</button> <p>/</p>
          <button onClick={() => toggleTempType(true)}>F</button>
        </div>
        <h2>{weatherData?.city ?? "Unknown City"}</h2>
      </div>

      <div className={style.moreInfo}>
        <div className={style.spacer}>
          <FontAwesomeIcon icon={faWater} className={style.moreInfoIcon} />
          <div className={style.moreInfoData}>
            <p className={style.topInfo}>{weatherData?.humidity ?? "0"}%</p>
            <p className={style.bottomInfo}>Humidity</p>
          </div>
        </div>
        <div className={style.spacer}>
          <FontAwesomeIcon icon={faWind} className={style.moreInfoIcon} />
          <div className={style.moreInfoData}>
            <p className={style.topInfo}>{weatherData?.wind ?? "0"} Km/h</p>
            <p className={style.bottomInfo}>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
