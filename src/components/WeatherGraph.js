import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherGraph = ({ data }) => {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Max Temp (°C)",
        data: data.maxTemps,
        borderColor: "#FF5733", // Red
        fill: false,
      },
      {
        label: "Min Temp (°C)",
        data: data.minTemps,
        borderColor: "#3498db", // Blue
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            return `Date: ${tooltipItems[0].label}`;
          },
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}°C`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default WeatherGraph;
