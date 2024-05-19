import React from "react";
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

const getWeatherIcon = (description, isDaytime) => {
  description = description.toLowerCase();

  if (description.includes("clear")) {
    return isDaytime ? <WiDaySunny /> : <WiNightClear />;
  } else if (description.includes("cloud")) {
    return isDaytime ? <WiDayCloudy /> : <WiNightCloudy />;
  } else if (description.includes("rain") || description.includes("drizzle")) {
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

const WeatherCard = ({ weather }) => {
  const isDaytime = new Date().getHours() > 6 && new Date().getHours() < 18;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <div className="weather-icon">
        {getWeatherIcon(weather.weather[0].description, isDaytime)}
      </div>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
