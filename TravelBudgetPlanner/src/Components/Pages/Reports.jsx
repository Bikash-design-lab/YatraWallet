// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";

import { Bar, Pie } from "react-chartjs-2";
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

import { AlertTriangle, Download, Share2 } from "lucide-react";
const Reports = () => {
  const reportRef = useRef();
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json"
        );
        const data = await response.json();
        if (!data) return;

        const expenseMap = {};
        const transactionList = [];
        Object.entries(data).forEach(([id, expense]) => {
          const { category, amount, date, note, transactionMode } = expense;
          if (category && amount) {
            expenseMap[category] =
              (expenseMap[category] || 0) + parseFloat(amount);
          }
          transactionList.push({
            id,
            category,
            amount,
            date,
            note,
            transactionMode,
          });
        });

        setChartData({
          labels: Object.keys(expenseMap),
          datasets: [
            {
              label: "Total Amount Spent",
              data: Object.values(expenseMap),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        setTransactions(transactionList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const shareButton = async () => {
    const currentURL = window.location.href; // Get the current page URL

    try {
      // If Web Share API is available (for mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: "Expense Report",
          text: "Check out this financial report!",
          url: currentURL,
        });
        console.log("Shared successfully!");
      } else {
        // Fallback: Copy to clipboard (Handle browsers that don't support navigator.clipboard)
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(currentURL);
          alert("Link copied to clipboard! Share it with anyone.");
        } else {
          // Fallback for older browsers or non-secure environments
          const input = document.createElement("input");
          input.value = currentURL;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          document.body.removeChild(input);
          alert("Link copied to clipboard!");
        }
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Sharing failed. Please try again.");
    }
  };

  const generatePDF = () => {
    alert(
      "We apologize for the inconvenience. The report download service is temporarily unavailable. Please try again later."
    );
    // const element = reportRef.current;
    // if (!element) {
    //   console.error("Report section not found!");
    //   return;
    // }
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Small delay
    // const canvas = await html2canvas(element, { scale: 2 }); // Better quality
    // const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("p", "mm", "a4");
    // pdf.addImage(imgData, "PNG", 10, 10, 190, 250);
    // pdf.save("report.pdf");
  };

  return (
    <div ref={reportRef} className="container mx-auto p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={shareButton}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button
          onClick={generatePDF}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </button>
        <span>
          <b> Financial Year:</b>
          {`${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`}
        </span>
        <div>
          <b>Last Updated: </b>
          {new Date().toLocaleString()}
        </div>
      </div>
      <h2 className="text-xl font-bold text-center mb-4">
        Expense Breakdown by Category
      </h2>

      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: true } },
            }}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mt-6 text-center">All Transactions</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Note</th>
              <th className="border border-gray-300 p-2">Transaction Mode</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="text-center odd:bg-gray-100 even:bg-white"
              >
                <td className="border border-gray-300 p-2">{txn.date}</td>
                <td className="border border-gray-300 p-2">{txn.category}</td>
                <td className="border border-gray-300 p-2">₹ {txn.amount}</td>
                <td className="border border-gray-300 p-2">
                  {txn.note || "-"}
                </td>
                <td className="border border-gray-300 p-2">
                  {txn.transactionMode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BudgetChart />
      {/* Footer */}
      <div className="border-t border-gray-300 p-6 mt-4">
        <div className="text-sm text-gray-600 text-center">
          <p>Generated automatically by Financial Report System</p>
          <p className="mt-1">
            © {new Date().getFullYear()} YatraWallet. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;

const BudgetChart = () => {
  const [budgetData, setBudgetData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/SpendingLimit.json"
        );
        const data = await response.json();
        if (!data) return;

        const budgetMap = {};
        Object.entries(data).forEach(([id, budget]) => {
          const { category, targetAmount } = budget;
          if (category && targetAmount) {
            budgetMap[category] =
              (budgetMap[category] || 0) + parseFloat(targetAmount);
          }
        });

        setBudgetData({
          labels: Object.keys(budgetMap),
          datasets: [
            {
              label: "Budget Limits",
              data: Object.values(budgetMap),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-bold text-center">
        Category-wise Budget Limit
      </h2>
      <div className="w-64 sm:w-96">
        <Pie
          data={budgetData}
          options={{ responsive: true, plugins: { legend: { display: true } } }}
        />
      </div>
    </div>
  );
};
