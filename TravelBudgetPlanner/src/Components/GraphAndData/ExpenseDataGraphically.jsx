import React from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseDataGraphically = ({ expenseData }) => {
  const categories = [
    "Food",
    "Accomodation",
    "Hotel",
    "Movie",
    "Guide",
    "Ticket",
    "Pets",
    "Cloth",
    "Health",
    "Other",
  ];

  const filteredData = expenseData.filter((expense) =>
    categories.includes(expense.category)
  );

  const data = {
    labels: filteredData.map((expense) => expense.category),
    datasets: [
      {
        label: "Amount Spent",
        data: filteredData.map((expense) => parseFloat(expense.amount)),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Expenses Breakdown by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  console.log(expenseData);
  return (
    <div className="min-w-fit my-6 border-gray-400">
      <h1 className="text-xl text-center font-semibold">
        Expenses Data Visualization
      </h1>
      <div className="w-full h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseDataGraphically;
