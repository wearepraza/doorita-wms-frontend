"use client"

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const MyLineChart = ({entries, exits}) => {
  // X - axis lable
  const labels = ["آذر", "دی", "بهمن", "اسفند", "فروردین", "اردیبهشت", "خرداد", "تیر"];

  // Data want to show on chart
  const datasets = [12, 45, 67, 43, 89, 34, 67, 43];
  const datasets2 = [10, 55, 60, 43, 20, 30, 96, 81];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "محصولات ورودی",
        data: entries,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "محصولات خروجی",
        data: exits,
        fill: false,
        borderColor: "#E62F32",
        tension: 0.1,
      }
    ],
  };

  // To make configuration
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "ورودی و خروجی",
        },
        display: true,
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: "تایم زمانی",
        },
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "380px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyLineChart;