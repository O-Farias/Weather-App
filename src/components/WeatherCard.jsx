import React from "react";
import "../index.css";

// Importar ícones personalizados
import clearDayIcon from "../assets/icons/clear-day.png";
import clearNightIcon from "../assets/icons/clear-night.png";
import cloudyDayIcon from "../assets/icons/cloudy-day.png";
import cloudyNightIcon from "../assets/icons/cloudy-night.png";
import rainDayIcon from "../assets/icons/rain-day.png";
import rainNightIcon from "../assets/icons/rain-night.png";
import snowIcon from "../assets/icons/snow.png";
import thunderstormIcon from "../assets/icons/thunderstorm.png";
import fogIcon from "../assets/icons/fog.png";

// Função para verificar se é dia ou noite
const isDaytime = () => {
  const hours = new Date().getHours();
  return hours > 6 && hours < 18;
};

const getWeatherIcon = (description) => {
  description = description.toLowerCase();

  if (description.includes("clear")) {
    return isDaytime() ? (
      <img src={clearDayIcon} alt="Clear Sky" className="weather-icon-img" />
    ) : (
      <img
        src={clearNightIcon}
        alt="Clear Sky Night"
        className="weather-icon-img"
      />
    );
  } else if (description.includes("cloud")) {
    return isDaytime() ? (
      <img src={cloudyDayIcon} alt="Cloudy" className="weather-icon-img" />
    ) : (
      <img
        src={cloudyNightIcon}
        alt="Cloudy Night"
        className="weather-icon-img"
      />
    );
  } else if (description.includes("rain") || description.includes("drizzle")) {
    return isDaytime() ? (
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
    return isDaytime() ? (
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

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <div className="weather-icon">
        {getWeatherIcon(weather.weather[0].description)}
      </div>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
