import { fetchWeatherByCoords } from "../utils/weatherApi";

// Custom hook for handling location-based weather fetching
export const useLocation = (setCity) => {
  // Function to get user's current location and fetch weather for that location
  const getCurrentLocation = (refetch) => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    console.log("Getting location...");

    // Get current position using browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      // Success callback - when location is obtained
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Location obtained:", latitude, longitude);

        // Fetch weather data for the obtained coordinates
        fetchWeatherByCoords(latitude, longitude)
          .then((data) => {
            console.log("Weather data received:", data.name);
            setCity(data.name);
            // Call refetch if it's available to update the weather display
            if (refetch) {
              setTimeout(() => refetch(), 200);
            }
          })
          .catch((error) => {
            console.error("Weather fetch error:", error);
          });
      },
      // Error callback - when location access fails
      (error) => {
        console.error("Geolocation error:", error);
      },
      // Geolocation options
      {
        enableHighAccuracy: false, // Don't require high accuracy for better compatibility
        timeout: 15000, // 15 second timeout
        maximumAge: 600000, // Cache location for 10 minutes
      }
    );
  };

  return { getCurrentLocation };
};
