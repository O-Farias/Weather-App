const API_KEY = "d99a7652d37ee43ca73f0745a507cba7";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
};

export const fetchWeatherByCoordinates = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data;
};

export const fetchForecast = async (location) => {
  const url = location.includes(",")
    ? `${BASE_URL}/forecast?lat=${location.split(",")[0]}&lon=${
        location.split(",")[1]
      }&appid=${API_KEY}&units=metric`
    : `${BASE_URL}/forecast?q=${encodeURIComponent(
        location
      )}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
