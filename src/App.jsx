import React, { useState, useRef } from "react";
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
import { FaGithub, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { SiReact } from "react-icons/si";
import "./index.css";
import clearDayIcon from "./assets/icons/clear-day.png";
import clearNightIcon from "./assets/icons/clear-night.png";
import cloudyDayIcon from "./assets/icons/cloudy-day.png";
import cloudyNightIcon from "./assets/icons/cloudy-night.png";
import rainDayIcon from "./assets/icons/rain-day.png";
import rainNightIcon from "./assets/icons/rain-night.png";
import snowIcon from "./assets/icons/snow.png";
import thunderstormIcon from "./assets/icons/thunderstorm.png";
import fogIcon from "./assets/icons/fog.png";

const Footer = () => (
  <footer className="footer">
    <p>
      Made with <FiCoffee /> <SiReact /> - by{" "}
      <a
        href="https://github.com/O-Farias"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mateus Farias
      </a>
    </p>
    <div className="social-icons">
      <a
        href="https://github.com/O-Farias"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/mateus-farias-b6ab77247/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://www.instagram.com/_fariasm/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
    </div>
  </footer>
);

// Função para verificar se é dia ou noite
const isDaytime = (timestamp, timezone) => {
  const localTime = new Date((timestamp + timezone) * 1000);
  const hours = localTime.getUTCHours();
  return hours > 6 && hours < 18;
};

const getWeatherIcon = (description, isDaytime) => {
  description = description.toLowerCase();

  if (description.includes("clear")) {
    return isDaytime ? (
      <img src={clearDayIcon} alt="Clear Sky" className="weather-icon-img" />
    ) : (
      <img
        src={clearNightIcon}
        alt="Clear Sky Night"
        className="weather-icon-img"
      />
    );
  } else if (description.includes("cloud")) {
    return isDaytime ? (
      <img src={cloudyDayIcon} alt="Cloudy" className="weather-icon-img" />
    ) : (
      <img
        src={cloudyNightIcon}
        alt="Cloudy Night"
        className="weather-icon-img"
      />
    );
  } else if (description.includes("rain") || description.includes("drizzle")) {
    return isDaytime ? (
      <img src={rainDayIcon} alt="Rain" className="weather-icon-img" />
    ) : (
      <img src={rainNightIcon} alt="Rain Night" className="weather-icon-img" />
    );
  } else if (description.includes("thunderstorm")) {
    return (
      <img
        src={thunderstormIcon}
        alt="Thunderstorm"
        className="weather-icon-img"
      />
    );
  } else if (description.includes("snow")) {
    return <img src={snowIcon} alt="Snow" className="weather-icon-img" />;
  } else if (description.includes("mist") || description.includes("fog")) {
    return <img src={fogIcon} alt="Fog" className="weather-icon-img" />;
  } else {
    return isDaytime ? (
      <img src={clearDayIcon} alt="Clear Sky" className="weather-icon-img" />
    ) : (
      <img
        src={clearNightIcon}
        alt="Clear Sky Night"
        className="weather-icon-img"
      />
    );
  }
};

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
        setWeather(null);
        setForecast(null);
        setError("City not found");
        toast.error("City not found");
      }
    } catch (error) {
      setWeather(null);
      setForecast(null);
      setError("Error fetching weather data");
      toast.error("Error fetching weather data");
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
              setWeather(null);
              setForecast(null);
              setError("Location not found");
              toast.error("Location not found");
            }
          } catch (error) {
            setWeather(null);
            setForecast(null);
            setError("Error fetching weather data");
            toast.error("Error fetching weather data");
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

  const forecastAnimation = useSpring({
    opacity: showForecast ? 1 : 0,
    transform: showForecast ? "translateY(0)" : "translateY(-20px)",
    config: { duration: 600 },
  });

  return (
    <div className="content">
      <ToastContainer />
      <h1>
        <img src={cloudyDayIcon} alt="Cloud" className="title-icon" /> Weather
        App <img src={clearDayIcon} alt="Sun" className="title-icon" />
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
      {error && <p>{error}</p>}
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
          <>
            <h3>5-Day Forecast</h3>
            <WeatherChart forecast={forecast} />
            <div className="forecast-cards">
              {forecast.list.map((item) => (
                <div key={item.dt} className="forecast-card">
                  <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
                  <div className="weather-icon">
                    {getWeatherIcon(
                      item.weather[0].description,
                      isDaytime(item.dt, forecast.city.timezone)
                    )}
                  </div>
                  <p>{item.weather[0].description}</p>
                  <p>Temp: {item.main.temp}°C</p>
                </div>
              ))}
            </div>
          </>
        )}
      </animated.div>
      <Footer />
    </div>
  );
};

export default App;
