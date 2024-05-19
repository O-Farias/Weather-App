import React, { useState, useRef, Suspense } from "react";
import { useSpring, animated } from "react-spring";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import WeatherChart from "./components/WeatherChart";
import {
  fetchWeather,
  fetchForecast,
  fetchWeatherByCoordinates,
} from "./services/weatherService";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudy,
  WiDayRain,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
} from "react-icons/wi";
import "./index.css";

const ErrorMessage = ({ message }) => <p style={{ color: "red" }}>{message}</p>;

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const forecastRef = useRef(null);

  const handleSearch = async (city) => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      if (weatherData.cod === 200 && forecastData.cod === "200") {
        setWeather(weatherData);
        setForecast(forecastData);
        setError(null);
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      setWeather(null);
      setForecast(null);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await fetchWeatherByCoordinates(
              latitude,
              longitude
            );
            const forecastData = await fetchForecast(
              `${latitude},${longitude}`
            );
            if (weatherData.cod === 200 && forecastData.cod === "200") {
              setWeather(weatherData);
              setForecast(forecastData);
              setError(null);
            } else {
              throw new Error("Location not found");
            }
          } catch (error) {
            setWeather(null);
            setForecast(null);
            setError(error.message);
            toast.error(error.message);
          }
        },
        (error) => {
          setError("Error fetching location");
          toast.error("Error fetching location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
    if (!showForecast) {
      setTimeout(() => {
        forecastRef.current.scrollIntoView({ behavior: "smooth" });
      }, 600);
    }
  };

  const getWeatherIcon = (description, isDaytime) => {
    description = description.toLowerCase();

    if (description.includes("clear")) {
      return isDaytime ? <WiDaySunny /> : <WiNightClear />;
    } else if (description.includes("cloud")) {
      return isDaytime ? <WiDayCloudy /> : <WiNightCloudy />;
    } else if (
      description.includes("rain") ||
      description.includes("drizzle")
    ) {
      return isDaytime ? <WiDayRain /> : <WiNightRain />;
    } else if (description.includes("thunderstorm")) {
      return <WiThunderstorm />;
    } else if (description.includes("snow")) {
      return <WiSnow />;
    } else if (description.includes("mist") || description.includes("fog")) {
      return <WiFog />;
    } else {
      return isDaytime ? <WiDaySunny /> : <WiNightClear />;
    }
  };

  const isDaytime = new Date().getHours() > 6 && new Date().getHours() < 18;

  const forecastAnimation = useSpring({
    opacity: showForecast ? 1 : 0,
    transform: showForecast ? "translateY(0)" : "translateY(-20px)",
    config: { duration: 600 },
  });

  return (
    <div className="content">
      <ToastContainer />
      <h1>
        <WiCloud /> Weather App <WiDaySunny />
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="button-container">
        <button className="geo-button" onClick={handleGeoLocation}>
          Use Current Location
        </button>
        <button className="forecast-button" onClick={toggleForecast}>
          {showForecast ? "Hide 5-Day Forecast" : "Show 5-Day Forecast"}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
      <animated.div
        ref={forecastRef}
        style={forecastAnimation}
        className="forecast"
      >
        {showForecast && forecast && (
          <Suspense fallback={<div>Loading...</div>}>
            <h3>5-Day Forecast</h3>
            <WeatherChart forecast={forecast} />
            <div className="forecast-cards">
              {forecast.list.map((item) => (
                <div key={item.dt} className="forecast-card">
                  <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
                  <div className="weather-icon">
                    {getWeatherIcon(item.weather[0].description, isDaytime)}
                  </div>
                  <p>{item.weather[0].description}</p>
                  <p>Temp: {item.main.temp}°C</p>
                </div>
              ))}
            </div>
          </Suspense>
        )}
      </animated.div>
    </div>
  );
};

export default App;
