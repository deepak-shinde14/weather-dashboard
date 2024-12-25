import React, { useState } from "react";
import InputForm from "./components/InputForm";
import WeatherGraph from "./components/WeatherGraph";
import WeatherTable from "./components/WeatherTable";
import { fetchWeatherData } from "./utils/api";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleFetchData = async ({ latitude, longitude, startDate, endDate }) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(latitude, longitude, startDate, endDate);
      setWeatherData({
        dates: data.time,
        maxTemps: data.temperature_2m_max,
        minTemps: data.temperature_2m_min,
      });
    } catch (error) {
      console.error(error);
      alert("Error fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <InputForm onFetchData={handleFetchData} />
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500"></div>
          <p>Loading...</p>
        </div>
      ) : weatherData ? (
        <>
          <WeatherGraph data={weatherData} />
          <WeatherTable data={weatherData.dates.map((date, index) => ({
            date,
            maxTemp: weatherData.maxTemps[index],
            minTemp: weatherData.minTemps[index],
          }))} />
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default App;
