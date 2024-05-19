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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ forecast }) => {
  const data = {
    labels: forecast.list.map((item) =>
      new Date(item.dt * 1000).toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        hour12: true,
      })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.list.map((item) => item.main.temp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", 
        },
      },
      title: {
        display: true,
        text: "5-Day Temperature Forecast",
        color: "white", 
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", 
        },
      },
      y: {
        ticks: {
          color: "white", 
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
