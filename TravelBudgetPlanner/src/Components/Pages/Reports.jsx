import React, { useEffect, useState } from "react";
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
        // Fallback: Copy to clipboard and show an alert
        await navigator.clipboard.writeText(currentURL);
        alert("Link copied to clipboard! Share it with anyone.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleDownload = () => {
    alert(
      "We apologize for the inconvenience. The report download service is temporarily unavailable. Please try again later."
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={shareButton}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button
          onClick={handleDownload}
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

// import React from "react";
// import {
//   NotepadText,
//   Download,
//   Printer,
//   Share2,
//   Building2,
//   Calendar,
//   IndianRupee,
// } from "lucide-react";
// import VisualizeBudgetData from "../GraphAndData/VisualizeBudgetData";
// import ExpenseDataGraphically from "../GraphAndData/ExpenseDataGraphically";

// const Reports = ({
//   budgetData = [],
//   expenseData = [],
//   companyName = "YatraWallet",
// }) => {
//   const currentDate = new Date().toLocaleString();

//   const handleDownload = () => {
//     const report = document.getElementById("report-page");

//     html2canvas(report, { backgroundColor: "#ffffff", scale: 2 }).then(
//       (canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgWidth = 210;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         pdf.save("Financial_Report.pdf");
//       }
//     );
//   };

//   return (
//     <div id="report-page" className="min-h-screen bg-white py-8">
//       <div className="max-w-6xl mx-auto px-4 md:px-8">
//         {/* Report Card */}
//         <div className="bg-white shadow-xl rounded-xl border border-gray-300">
//           {/* Header Section */}
//           <div className="border-b border-gray-300 p-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               {/* Company Info */}
//               <div className="flex items-center gap-2">
//                 <Building2 className="text-gray-800 h-6 w-6" />
//                 <h2 className="text-xl text-gray-800 font-bold">
//                   {companyName}
//                 </h2>
//               </div>
//               {/* Action Buttons */}
//               <div className="flex items-center gap-3">
//                 <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
//                   <Share2 className="h-4 w-4" />
//                   <span className="hidden sm:inline">Share</span>
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition"
//                 >
//                   <Download className="h-4 w-4" />
//                   <span className="hidden sm:inline">Download</span>
//                 </button>
//               </div>
//             </div>
//             {/* Report Details */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4" />
//                 <span>Generated: {currentDate}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <IndianRupee className="h-4 w-4" />
//                 <span>
//                   Financial Year:{" "}
//                   {`${
//                     new Date().getFullYear() - 1
//                   } - ${new Date().getFullYear()}`}
//                 </span>
//               </div>
//             </div>
//           </div>
//           {/* Main Content */}
//           <div className="p-6">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
//               Financial Expense Report
//             </h1>
//             {/* Budget Overview Section */}
//             <div className="mb-8 border border-gray-300 rounded-lg p-4">
//               <VisualizeBudgetData budgetData={budgetData} />
//             </div>
//             {/* Expense Analysis Section */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 My Expenses
//               </h2>
//               <div className="border border-gray-300 rounded-lg p-4">
//                 <ExpenseDataGraphically expenseData={expenseData} />
//               </div>
//             </div>
//             {/* Summary Section */}
//             <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">
//                 Report Summary
//               </h2>
//               <p className="text-sm text-gray-700">
//                 This report provides a comprehensive overview of financial
//                 expenses and budget allocation. Review the visualizations above
//                 for insights into spending patterns.
//               </p>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="border-t border-gray-300 p-6">
//             <div className="text-sm text-gray-600 text-center">
//               <p>Generated automatically by Financial Report System</p>
//               <p className="mt-1">
//                 © {new Date().getFullYear()} {companyName}. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;

// import React from "react";
// import {
//   NotepadText,
//   Download,
//   Printer,
//   Share2,
//   Building2,
//   Calendar,
//   IndianRupee,
// } from "lucide-react";
// import VisualizeBudgetData from "../GraphAndData/VisualizeBudgetData";
// import ExpenseDataGraphically from "../GraphAndData/ExpenseDataGraphically";

// const Reports = ({
//   budgetData = [],
//   expenseData = [],
//   companyName = "YatraWallet",
// }) => {
//   const currentDate = new Date().toLocaleString();

//   const handleDownload = () => {
//     console.log("download");
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 md:px-8">
//         {/* Report Card */}
//         <div className="bg-white shadow-xl rounded-xl border border-gray-200">
//           {/* Header Section */}
//           <div className="border-b border-gray-200">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 {/* Company Info */}
//                 <div className="flex items-center gap-2">
//                   <Building2 className="text-blue-600 h-6 w-6" />
//                   <h2 className="text-xl text-blue-600 font-bold">
//                     {companyName}
//                   </h2>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-3">
//                   <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
//                     <Share2 className="h-4 w-4" />
//                     <span className="hidden sm:inline">Share</span>
//                   </button>
//                   {/* <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
//                     <Printer className="h-4 w-4" />
//                     <span className="hidden sm:inline">Print</span>
//                   </button> */}
//                   <button
//                     onClick={handleDownload}
//                     className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
//                   >
//                     <Download className="h-4 w-4" />
//                     <span className="hidden sm:inline">Download</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Report Details */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="text-blue-600 h-4 w-4" />
//                   <span>Generated: {currentDate}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <IndianRupee className="text-blue-600 h-4 w-4" />
//                   <span>
//                     Financial Year:{" "}
//                     {`${new Date().getFullYear() - 1} -
//                       ${new Date().getFullYear()}`}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Main Content */}
//           <div className="p-6">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
//               Financial Expense Report
//             </h1>
//             {/* Budget Overview Section */}
//             <div className="mb-8">
//               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <VisualizeBudgetData budgetData={budgetData} />
//               </div>
//             </div>

//             {/* Expense Analysis Section */}
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 My expenses
//               </h2>
//               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                 <ExpenseDataGraphically expenseData={expenseData} />
//               </div>
//             </div>

//             {/* Summary Section */}
//             <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
//               <h2 className="text-lg font-semibold text-blue-800 mb-2">
//                 Report Summary
//               </h2>
//               <p className="text-sm text-blue-600">
//                 This report provides a comprehensive overview of the financial
//                 expenses and budget allocation for the current period. Please
//                 review the visualizations above for detailed insights into
//                 spending patterns and budget utilization.
//               </p>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-gray-200 p-6">
//             <div className="text-sm text-gray-500 text-center">
//               <p>Generated automatically by Financial Report System</p>
//               <p className="mt-1">
//                 © {new Date().getFullYear()} {companyName}. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;

// import React, { useEffect, useState } from "react";

// const Expenses = () => {
//   const [dateExp, setExpDate] = useState("");
//   const [amtExp, setExpAmt] = useState("");
//   const [cateExp, setCateExp] = useState("");
//   const [tranTypeExp, setTranExpType] = useState("");
//   const [noteExp, setExpNote] = useState("");
//   const [exprData, setExpData] = useState([]);

//   // Function to fetch data from Firebase
//   const fetchExpenseData = async () => {
//     try {
//       const res = await fetch(
//         "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json"
//       );
//       const data = await res.json();
//       const expenseArray = Object.values(data); // Convert object to array
//       setExpData(expenseArray); // Set state with fetched data
//     } catch (error) {
//       console.error("Error fetching expense data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenseData(); // Fetch expense data when component mounts
//   }, []); // Empty dependency array ensures this runs only once when component mounts

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Firebase Realtime Database URL
//     const firebaseUrl =
//       "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json";

//     const expenseData = {
//       date: dateExp,
//       amount: amtExp,
//       category: cateExp,
//       transactionMode: tranTypeExp,
//       note: noteExp,
//     };

//     // Making the POST request to Firebase using fetch
//     fetch(firebaseUrl, {
//       method: "POST",
//       body: JSON.stringify(expenseData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Data posted successfully:", data);
//         setExpData((prevData) => [...prevData, expenseData]);
//         setExpDate("");
//         setExpAmt(0);
//         setCateExp("");
//         setTranExpType("");
//         setExpNote("");
//       })
//       .catch((error) => {
//         console.error("Error posting data:", error);
//       });
//   };
//   return (
//     <div className=" bg-gradient-to-r from-orange-100 via-white to-blue-100 ">
//       <h1 className="text-center font-bold text-black text-4xl py-4">
//         🌍 Travel Smart: Set Limits, Track Expenses & Enjoy Stress-Free Trips!
//         ✈️
//       </h1>
//       <div className="bg-gradient-to-r pt-2 flex justify-center items-center mx-4">
//         <div className="w-1/3 bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition duration-150">
//           <CurrencyExchnage />
//         </div>

//         <div className="w-1/3 px-2 rounded mx-2 bg-white">
//           <ExpenseDataGraphically expenseData={exprData} />
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className=" w-1/3  bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-150 space-y-2 text-sm"
//         >
//           <h2 className="text-center font-semibold">➕ Add a Transaction</h2>

//           <div className="flex flex-col">
//             <label htmlFor="date" className="text-gray-600">
//               Date
//             </label>
//             <input
//               required
//               className="border p-1.5 rounded text-xs"
//               type="date"
//               id="date"
//               value={dateExp}
//               onChange={(e) => setExpDate(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-600">Amount</label>
//             <input
//               className="border p-1.5 rounded text-xs"
//               type="number"
//               placeholder="Enter amount"
//               value={amtExp}
//               onChange={(e) => setExpAmt(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-600">Category</label>
//             <select
//               required
//               className="border p-1.5 rounded text-xs"
//               value={cateExp}
//               onChange={(e) => setCateExp(e.target.value)}
//             >
//               <option value="Other">Select</option>
//               <option value="Food">Food</option>
//               <option value="Accomodation">Accomodation</option>
//               <option value="Hotel">Hotel</option>
//               <option value="Movie">Movie</option>
//               <option value="Guide">Guide</option>
//               <option value="Ticket">Ticket</option>
//               <option value="Pets">Pets</option>
//               <option value="Cloth">Cloth</option>
//               <option value="Health">Health</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label className="text-gray-600">Transaction Mode</label>
//             <select
//               required
//               className="border p-1.5 rounded text-xs"
//               value={tranTypeExp}
//               onChange={(e) => setTranExpType(e.target.value)}
//             >
//               <option value="Cash">Select</option>
//               <option value="UPI">UPI</option>
//               <option value="CreditCard">Credit Card</option>
//               <option value="DebitCard">Debit Card</option>
//               <option value="Cash">Cash</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label className="text-gray-600">Note</label>
//             <input
//               required
//               className="border p-1.5 rounded text-xs"
//               type="text"
//               value={noteExp}
//               placeholder="Description"
//               onChange={(e) => setExpNote(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       <ExpenseList expenseData={exprData} />
//     </div>
//   );
// };
// import { Calendar, CreditCard, Tag, IndianRupee, FileText } from "lucide-react";
// const ExpenseList = ({ expenseData }) => {
//   return (
//     <div className=" p-4 max-w-auto mx-auto ">
//       <h1 className="text-xl font-bold mb-4 text-gray-800">
//         An Overview of All My Expenses-
//       </h1>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//         {expenseData.map((expense, id) => (
//           <div
//             key={id}
//             className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition duration-150"
//           >
//             {/* Amount & Category */}
//             <div className="flex justify-between items-center mb-2">
//               <div className="flex items-center space-x-1">
//                 <IndianRupee className="w-4 h-4 text-green-600" />
//                 <span className="text-lg font-semibold text-gray-900">
//                   -{expense.amount}
//                 </span>
//               </div>
//               {/* Category Badge */}
//               <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
//                 <Tag className="w-3.5 h-3.5" />
//                 <span className="font-medium">{expense.category}</span>
//               </div>
//             </div>
//             {/* Date & Transaction Mode */}
//             <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-gray-700">
//               <div className="flex items-center space-x-1">
//                 <Calendar className="w-4 h-4 text-gray-500" />
//                 <span>{expense.date}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <CreditCard className="w-4 h-4 text-gray-500" />
//                 <span>{expense.transactionMode}</span>
//               </div>
//             </div>
//             {/* Description */}
//             {expense.note && (
//               <div className="flex items-start space-x-1 text-xs text-gray-700">
//                 <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
//                 <p>{expense.note}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Expenses;
