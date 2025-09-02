import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ExpenseDataGraphically from "../GraphAndData/ExpenseDataGraphically";

const Expenses = () => {
  const navigate = useNavigate();
  const [dateExp, setExpDate] = useState("");
  const [amtExp, setExpAmt] = useState("");
  const [cateExp, setCateExp] = useState("");
  const [tranTypeExp, setTranExpType] = useState("");
  const [noteExp, setExpNote] = useState("");
  const [exprData, setExpData] = useState([]);

  // Function to fetch data from Firebase
  const fetchExpenseData = async () => {
    try {
      const res = await fetch(
        "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json"
      );
      const data = await res.json();
      const expenseArray = Object.values(data); // Convert object to array
      setExpData(expenseArray); // Set state with fetched data
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  useEffect(() => {
    fetchExpenseData(); // Fetch expense data when component mounts
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase Realtime Database URL
    const firebaseUrl =
      "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/Expenses.json";

    const expenseData = {
      date: dateExp,
      amount: amtExp,
      category: cateExp,
      transactionMode: tranTypeExp,
      note: noteExp,
    };

    // Making the POST request to Firebase using fetch
    fetch(firebaseUrl, {
      method: "POST",
      body: JSON.stringify(expenseData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data posted successfully:", data);
        setExpData((prevData) => [...prevData, expenseData]);
        setExpDate("");
        setExpAmt(0);
        setCateExp("");
        setTranExpType("");
        setExpNote("");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };
  return (
    <div className=" bg-gradient-to-r from-orange-100 via-white to-blue-100 ">
      <h1 className="text-center py-4 font-bold text-2xl ">
        🌍 Travel Smart: Set Your Budget, Add Expenses, and Track Spending
        Effortlessly! ✈️
      </h1>
      <div className="bg-gradient-to-r pt-2 flex justify-center items-center mx-4">
        <div className="w-1/3 bg-white border border-gray-200 rounded-lg shadow-sm py-2 hover:shadow-md transition duration-150">
          <CurrencyExchnage />
        </div>

        <div className="min-w-fit min-h-fit w-1/3 px-2 rounded mx-2 bg-white border border-gray-200 shadow-sm hover:shadow-md transition duration-150">
          <ExpenseDataGraphically expenseData={exprData} />
        </div>

        <form
          onSubmit={handleSubmit}
          className=" w-1/3  bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-150 space-y-2 text-sm"
        >
          <h2 className="text-center font-semibold">➕ Add a Transactions</h2>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-600">
              Date
            </label>
            <input
              required
              className="border p-1.5 rounded text-xs"
              type="date"
              id="date"
              value={dateExp}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Amount</label>
            <input
              className="border p-1.5 rounded text-xs"
              type="number"
              placeholder="Enter amount"
              value={amtExp}
              onChange={(e) => setExpAmt(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Category</label>
            <select
              required
              className="border p-1.5 rounded text-xs"
              value={cateExp}
              onChange={(e) => setCateExp(e.target.value)}
            >
              <option value="Other">Select</option>
              <option value="Food">Food</option>
              <option value="Accomodation">Accomodation</option>
              <option value="Hotel">Hotel</option>
              <option value="Movie">Movie</option>
              <option value="Guide">Guide</option>
              <option value="Ticket">Ticket</option>
              <option value="Pets">Pets</option>
              <option value="Cloth">Cloth</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Transaction Mode</label>
            <select
              required
              className="border p-1.5 rounded text-xs"
              value={tranTypeExp}
              onChange={(e) => setTranExpType(e.target.value)}
            >
              <option value="Cash">Select</option>
              <option value="UPI">UPI</option>
              <option value="CreditCard">Credit Card</option>
              <option value="DebitCard">Debit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600">Note</label>
            <input
              required
              className="border p-1.5 rounded text-xs"
              type="text"
              value={noteExp}
              placeholder="Description"
              onChange={(e) => setExpNote(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="min-w-fit min-h-fit">
        <ExpenseList expenseData={exprData} />
      </div>
      <div className="flex justify-center my-5">
        <button
          onClick={(e) => navigate("/reports")}
          className="px-2 cursor-pointer bg-blue-500 text-white py-1.5 rounded text-xs hover:bg-blue-600 transition"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};
import { Calendar, CreditCard, Tag, IndianRupee, FileText } from "lucide-react";

const ExpenseList = ({ expenseData }) => {
  return (
    <div className=" p-4 max-w-auto mx-auto ">
      <h1 className="text-xl mb-4 text-gray-800 font-semibold">
        An Overview of All My Expenses-
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {expenseData.map((expense, id) => (
          <div
            key={id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition duration-150"
          >
            {/* Amount & Category */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-1">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">
                  -{expense.amount}
                </span>
              </div>
              {/* Category Badge */}
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                <Tag className="w-3.5 h-3.5" />
                <span className="font-medium">{expense.category}</span>
              </div>
            </div>
            {/* Date & Transaction Mode */}
            <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-gray-700">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{expense.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4 text-gray-500" />
                <span>{expense.transactionMode}</span>
              </div>
            </div>
            {/* Description */}
            {expense.note && (
              <div className="flex items-start space-x-1 text-xs text-gray-700">
                <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                <p>{expense.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Expenses;

// ----------------------------------------------------------------------------------------------------------------------------------------------------

import { Currency, ArrowRightLeft, Loader2, AlertCircle } from "lucide-react";

const CurrencyExchnage = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/faee40cb9dfaf48f0954631d/latest/${baseCurrency}`
        );
        const data = await response.json();
        if (data.result === "error") {
          throw new Error(data["error-type"]);
        }
        setExchangeData(data);
      } catch (err) {
        setError("Failed to fetch exchange rates. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchExchangeRates();
  }, [baseCurrency]);

  const convertedAmount =
    exchangeData?.conversion_rates?.[targetCurrency] * Number(amount);

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };
  return (
    <div className=" border-amber-600 ">
      <div className="bg-white rounded-xl shadow-lg p-4 w-auto">
        <div className=" flex items-center justify-between mb-6">
          <Currency className="text-blue-500 text-3xl" />
          <h1 className="text-xl font-semibold">Currency Exchange</h1>
        </div>
        {/* Card */}
        <div className=" space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md flex items-center space-x-2">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className=" block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Currency Selection Section */}
          <div className=" flex items-center justify-between space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                disabled={isLoading}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {exchangeData?.conversion_rates &&
                  Object.keys(exchangeData.conversion_rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapCurrencies}
              disabled={isLoading}
              className="p-3 bg-blue-500 text-white rounded-full disabled:opacity-50"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            {/* To Currency */}
            <div className="flex-1 ">
              <label className="block text-sm font-medium text-gray-700">
                To
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                disabled={isLoading}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {exchangeData?.conversion_rates &&
                  Object.keys(exchangeData.conversion_rates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Converted Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Converted Amount
            </label>
            <div className="mt-2 text-lg font-semibold">
              {isLoading ? (
                <Loader2 className="animate-spin text-blue-500 w-6 h-6 mx-auto" />
              ) : (
                <p>
                  {convertedAmount?.toFixed(2)} {targetCurrency}
                </p>
              )}
            </div>
          </div>

          {/* Last Updated */}
          {exchangeData && (
            <div className="text-xs text-gray-500 mt-4 text-center">
              Last updated:{" "}
              {new Date(
                exchangeData.time_last_update_unix * 1000
              ).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
