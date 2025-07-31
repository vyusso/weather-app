// Map of weather conditions to their corresponding icon images
export const iconMap = {
  clear: "/weatherImg/clear.png",
  cloud: "/weatherImg/cloud.png",
  drizzle: "/weatherImg/drizzle.png",
  rain: "/weatherImg/rain.png",
  snow: "/weatherImg/snow.png",
};

// Get the appropriate weather icon based on the weather description
export const getIcon = (desc) => {
  if (!desc) return iconMap.clear;
  const lowerDesc = desc.toLowerCase();

  // Match weather description to icon
  if (lowerDesc.includes("clear")) return iconMap.clear;
  if (lowerDesc.includes("clouds")) return iconMap.cloud;
  if (lowerDesc.includes("drizzle")) return iconMap.drizzle;
  if (lowerDesc.includes("rain")) return iconMap.rain;
  if (lowerDesc.includes("thunderstorm")) return iconMap.rain;
  if (lowerDesc.includes("mist")) return iconMap.rain;
  if (lowerDesc.includes("snow")) return iconMap.snow;
  return iconMap.clear;
};

// Process raw weather data into a clean format for display
export const processWeatherData = (weather) => {
  if (!weather) return null;

  return {
    tempC: Math.floor(weather.main.temp).toString() + "°C",
    tempF: Math.floor(weather.main.temp * 1.8 + 32).toString() + "°F",
    city: weather.name,
    humidity: weather.main.humidity,
    wind: Math.round(weather.wind.speed * 3.6), // Convert m/s to km/h
    description: weather.weather[0].main,
    detailedDescription: weather.weather[0].description,
  };
};
