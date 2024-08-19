import { useEffect, useState, useCallback } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. when app opens, current location weather is rendered
// 2. current location, temperature and status
// 3. there are 5 buttons (1 current location and 4 others)
// 4. when location is selected, selected city's weather is shown
// 5. when current location button is clicked, current location weather is shown 
// 6. until data has been received, this is shown by loading spinner

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null); // Default to null for current location
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const cities = ['Paris', 'Sydney', 'Melbourne', 'Seoul', 'Los Angeles'];

  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    setError(null); // Reset any previous error
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9c50d93799569302b94e2ab396b348f9&units=metric`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();

      if (data && data.main && data.weather && data.weather[0]) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again later.");
      setWeather(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    }, (error) => {
      console.error("Error getting current location:", error);
      setError("Unable to retrieve your current location. Please try again.");
      setLoading(false);
    });
  }, []);

  const getWeatherByCity = useCallback(async () => {
    if (!city) return; // Ensure there's a city name before making the request
    setLoading(true);
    setError(null); // Reset any previous error
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c50d93799569302b94e2ab396b348f9&units=metric`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else if (city) {
      getWeatherByCity();
    }
  }, [city, getWeatherByCity, getCurrentLocation]);

  const handleCityChange = (selectedCity) => {
    if (selectedCity === "current") {
      setCity(null);
    } else {
      setCity(selectedCity);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : error ? (
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      )}
    </div>
  );
}

export default App;