import axios from "axios";

export const fetchWeatherData = async (latitude, longitude, startDate, endDate) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min`;

  const response = await axios.get(url);
  return response.data.daily;
};
