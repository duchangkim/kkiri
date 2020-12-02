import client from './client';

export const getWeather = ({ latitude, longitude, API_KEY }) => {
  return client.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
};
