import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater, faWind } from "@fortawesome/free-solid-svg-icons";
import { getIcon } from "../../utils/weatherUtils";
import style from "./WeatherDisplay.module.css";

// WeatherDisplay component - shows the main weather information
export default function WeatherDisplay({
  weatherData,
  tempType,
  toggleTempType,
}) {
  return (
    <>
      {/* Weather icon display */}
      <div className={style.weatherImage}>
        <img
          src={getIcon(weatherData?.description)}
          alt="Weather"
          width="180px"
          height="180px"
        />
      </div>

      {/* Main weather information section */}
      <div className={style.weatherInfo}>
        {/* Temperature display */}
        <h1>
          {tempType ? weatherData?.tempF ?? "0°F" : weatherData?.tempC ?? "0°C"}
        </h1>

        {/* Temperature unit toggle (Celsius/Fahrenheit) */}
        <div className={style.tempType}>
          <button onClick={() => toggleTempType(false)}>C</button> <p>/</p>
          <button onClick={() => toggleTempType(true)}>F</button>
        </div>

        {/* City name */}
        <h2>{weatherData?.city ?? "Unknown City"}</h2>

        {/* Detailed weather description */}
        {weatherData?.detailedDescription && (
          <p className={style.weatherDescription}>
            {weatherData.detailedDescription}
          </p>
        )}
      </div>

      {/* Additional weather details (humidity and wind) */}
      <div className={style.moreInfo}>
        {/* Humidity information */}
        <div className={style.spacer}>
          <FontAwesomeIcon icon={faWater} className={style.moreInfoIcon} />
          <div className={style.moreInfoData}>
            <p className={style.topInfo}>{weatherData?.humidity ?? "0"}%</p>
            <p className={style.bottomInfo}>Humidity</p>
          </div>
        </div>

        {/* Wind speed information */}
        <div className={style.spacer}>
          <FontAwesomeIcon icon={faWind} className={style.moreInfoIcon} />
          <div className={style.moreInfoData}>
            <p className={style.topInfo}>{weatherData?.wind ?? "0"} Km/h</p>
            <p className={style.bottomInfo}>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );
}
