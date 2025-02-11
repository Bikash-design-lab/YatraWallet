import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const VisualizeBudgetData = ({ budgetData }) => {
  const [categoryBudget, setCategoryBudget] = useState({});

  // Predefined categories
  const predefinedCategories = [
    "Accommodation",
    "Transportation",
    "Food & Dining",
    "Entertainment",
    "Shopping",
    "Health & Wellness",
    "Outdoor Activities",
    "Miscellaneous",
  ];

  useEffect(() => {
    const categorySums = predefinedCategories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    budgetData.forEach((item) => {
      if (predefinedCategories.includes(item.category)) {
        categorySums[item.category] += item.targetAmount || 0;
      }
    });

    setCategoryBudget(categorySums);
  }, [budgetData]);

  // Convert categoryBudget into chart data
  const labels = Object.keys(categoryBudget);
  const values = Object.values(categoryBudget);

  // Calculate total sum
  const totalAmount = values.reduce((sum, value) => sum + value, 0);

  // Calculate percentages
  const percentageData = values.map((value) =>
    totalAmount > 0 ? ((value / totalAmount) * 100).toFixed(1) : 0
  );

  const chartData = {
    labels: labels.map(
      (label, index) => `${label} (${percentageData[index]}%)`
    ),
    datasets: [
      {
        label: "Budget Allocation",
        data: values,
        backgroundColor: [
          "#ff6384", // Red
          "#36a2eb", // Blue
          "#ffce56", // Yellow
          "#4bc0c0", // Teal
          "#9966ff", // Purple
          "#ff9f40", // Orange
          "#c9cbcf", // Grey
          "#ff0000", // Bright Red
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let category = labels[tooltipItem.dataIndex];
            let amount = values[tooltipItem.dataIndex];
            return `${category}: $${amount}`;
          },
        },
      },
      legend: {
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, index) => ({
              text: label,
              fillStyle: data.datasets[0].backgroundColor[index],
              hidden: !chart.getDataVisibility(index),
            }));
          },
        },
      },
    },
  };
  console.log(budgetData);
  return (
    <div className=" rounded-lg shadow-md border-gray-500 pb-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 md:py-3 lg:py-4">
        Budget Allocation
      </h1>
      <div className="h-64 md:h-80 lg:h-96 w-full p-2 md:p-4">
        <Pie data={chartData} options={options} />
      </div>

      <div className="w-full max-w-md mx-auto overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden min-w-[320px]">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-gray-900">
                S No.
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-gray-900">
                Budget
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(categoryBudget).map(([category, total], id) => (
              <tr key={category} className="hover:bg-gray-50">
                <td className="text-center px-4 sm:px-6 py-3 text-xs sm:text-sm">
                  {id + 1}
                </td>
                <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 flex items-center">
                  <span className="mr-2"></span>
                  {category}
                </td>
                <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 text-right">
                  ₹{total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VisualizeBudgetData;
