import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../../utils/weatherApi";
import { processWeatherData } from "../../../utils/weatherUtils";
import { useLocation } from "../../../hooks/useLocation";
import SearchBar from "../../../components/SearchBar/SearchBar";
import WeatherDisplay from "../../../components/WeatherDisplay/WeatherDisplay";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import style from "./Weather.module.css";

// Main Weather component - orchestrates the entire weather app functionality
export default function Weather() {
  // State for search input and current city
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("New York");

  // State for temperature unit (true = Fahrenheit, false = Celsius)
  const [tempType, setTempType] = useState(true);

  // React Query hook for fetching weather data
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

  // Custom hook for location functionality
  const { getCurrentLocation } = useLocation(setCity);

  // Process raw weather data into display format
  const weatherData = processWeatherData(weather);

  // Handle search button click or Enter key press
  const handleSearch = () => {
    if (!inputCity.trim()) return;
    setCity(inputCity);
    refetch();
  };

  // Handle location button click
  const handleLocationClick = () => {
    getCurrentLocation(refetch);
  };

  // Toggle between Celsius and Fahrenheit
  const toggleTempType = (isFarenheit) => setTempType(isFarenheit);

  // Log weather data when it changes (for debugging)
  useEffect(() => {
    if (weather) {
      console.log(weather);
    }
  }, [weather]);

  return (
    <div className={style.weatherContainer}>
      {/* Search bar with input and buttons */}
      <SearchBar
        inputCity={inputCity}
        setInputCity={setInputCity}
        handleSearch={handleSearch}
        handleLocationClick={handleLocationClick}
      />

      {/* Show loading spinner while fetching data */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        /* Show weather information when data is loaded */
        <WeatherDisplay
          weatherData={weatherData}
          tempType={tempType}
          toggleTempType={toggleTempType}
        />
      )}
    </div>
  );
}
