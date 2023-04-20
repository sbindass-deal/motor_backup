import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const data = {
  labels,
  datasets: [
    {
      label: "Bid closed prince",
      data: { January: 1000, February: 600, March: 800, April: 900, May:600,June: 600,August:500,September: 800, November: 600},
      borderColor: "#f8a504",
      backgroundColor: "#f8a504",
    },
   
   
  ],
};

const Analytics = () => {
  return <Line options={options} data={data} />;
};
export default Analytics;
