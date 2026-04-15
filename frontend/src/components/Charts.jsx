import React, { useEffect, useState } from "react";
import {
  Line
} from "react-chartjs-2";

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
    setData(result);
  }

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Orders",
        data: data.map((d) => d.orders),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Revenue",
        data: data.map((d) => d.revenue),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h3>Orders & Revenue Overview</h3>
      <Line data={chartData} />
    </div>
  );
}

export default Charts;