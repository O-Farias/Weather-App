import React from "react";

const WeatherDetails = ({ weather }) => {
  return (
    <div className="weather-details">
      <h2>Weather Details</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Feels Like: {weather.main.feels_like}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Wind Direction: {weather.wind.deg}°</p>
    </div>
  );
};

export default WeatherDetails;
