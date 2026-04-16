import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../styles/Charts.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const res = await fetch("http://localhost:5000/api/orders/stats");
    const result = await res.json();
    setData(result || []);
  }

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Orders",
        data: data.map((d) => d.orders),
        borderColor: "#2F80ED", // theme primary
        backgroundColor: "rgba(47,128,237,0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Revenue",
        data: data.map((d) => d.revenue),
        borderColor: "#27AE60", // theme secondary
        backgroundColor: "rgba(39,174,96,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1F2937",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>📊 Orders & Revenue</h3>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Charts;