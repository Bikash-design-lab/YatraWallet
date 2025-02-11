import React, { useState, useEffect } from "react";
import VisualizeBudgetData from "../GraphAndData/VisualizeBudgetData";
import {
  Home,
  Car,
  Utensils,
  Plane,
  ShoppingBag,
  Film,
  Heart,
  Wallet,
  X,
  DollarSign,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Circle,
} from "lucide-react";

const ExpenseTarget = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [targetAmount, setTargetAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgetData, setBudgetData] = useState([]); // we set the empty budget data
  const categories = [
    {
      id: 1,
      name: "Accommodation",
      icon: <Home className="h-5 w-5" />,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      subcategories: [
        { id: "1-1", name: "Hotels" },
        { id: "1-2", name: "Airbnb" },
        { id: "1-3", name: "Hostels" },
        { id: "1-4", name: "Resorts" },
      ],
    },
    {
      id: 2,
      name: "Transportation",
      icon: <Car className="h-5 w-5" />,
      color: "bg-green-500",
      textColor: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      subcategories: [
        { id: "2-1", name: "Public Transit" },
        { id: "2-2", name: "Ride Share" },
        { id: "2-3", name: "Car Rental" },
        { id: "2-4", name: "Fuel" },
      ],
    },
    {
      id: 3,
      name: "Food & Dining",
      icon: <Utensils className="h-5 w-5" />,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      subcategories: [
        { id: "3-1", name: "Restaurants" },
        { id: "3-2", name: "Groceries" },
        { id: "3-3", name: "Takeout" },
        { id: "3-4", name: "Cafes" },
      ],
    },
    {
      id: 4,
      name: "Entertainment",
      icon: <Film className="h-5 w-5" />,
      color: "bg-red-500",
      textColor: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      subcategories: [
        { id: "4-1", name: "Movies" },
        { id: "4-2", name: "Concerts" },
        { id: "4-3", name: "Museums" },
        { id: "4-4", name: "Theme Parks" },
      ],
    },
    {
      id: 5,
      name: "Shopping",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      subcategories: [
        { id: "5-1", name: "Clothing" },
        { id: "5-2", name: "Souvenirs" },
        { id: "5-3", name: "Electronics" },
        { id: "5-4", name: "Accessories" },
      ],
    },
    {
      id: 6,
      name: "Health & Wellness",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-pink-500",
      textColor: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      subcategories: [
        { id: "6-1", name: "Gym & Fitness" },
        { id: "6-2", name: "Spa & Massage" },
        { id: "6-3", name: "Medical Expenses" },
        { id: "6-4", name: "Pharmacy" },
      ],
    },
    {
      id: 7,
      name: "Outdoor Activities",
      icon: <Circle className="h-5 w-5" />,
      color: "bg-teal-500",
      textColor: "text-teal-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      subcategories: [
        { id: "7-1", name: "Hiking" },
        { id: "7-2", name: "Camping" },
        { id: "7-3", name: "Cycling" },
        { id: "7-4", name: "Water Sports" },
      ],
    },
    {
      id: 8,
      name: "Miscellaneous",
      icon: <ClipboardList className="h-5 w-5" />,
      color: "bg-gray-500",
      textColor: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      subcategories: [
        { id: "8-1", name: "Tips & Gratuities" },
        { id: "8-2", name: "Donations" },
        { id: "8-3", name: "Emergency Funds" },
        { id: "8-4", name: "Other Expenses" },
      ],
    },
  ];

  useEffect(() => {
    fetch(
      "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/SpendingLimit.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setBudgetData(dataArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = async (categoryId, subcategoryId) => {
    if (!targetAmount) {
      alert("Please enter a target amount");
      return;
    }
    setLoading(true);
    try {
      const category = categories.find((c) => c.id === categoryId);
      const subcategory = category.subcategories.find(
        (s) => s.id === subcategoryId
      );

      const expenseData = {
        category: category.name,
        subcategory: subcategory.name,
        targetAmount: Number(targetAmount),
        setAt: new Date().toISOString(),
      };

      setBudgetData((prevData) => [
        ...prevData,
        { ...expenseData, id: Date.now().toString() },
      ]);
      await fetch(
        "https://expensedatayatrawallet-default-rtdb.asia-southeast1.firebasedatabase.app/SpendingLimit.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        }
      );

      setTargetAmount("");
      setSelectedSubcategory(null);
    } catch (error) {
      alert("Failed to set target. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="  min-h-screen bg-gray-50 bg-gradient-to-r from-orange-100 via-white to-blue-100 ">
      <div className="container mx-auto px-4 py-8 justify-end">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Budget Targets</h1>
          </div>
          <button
            onClick={() => navigate("/Expenses")}
            className="px-2 bg-blue-500 cursor-pointer text-white py-1.5 rounded text-[12px] hover:bg-blue-600 transition"
          >
            + expenses
          </button>
        </div>
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              {/* Category Card */}
              <div
                className={`rounded-lg border ${category.borderColor} bg-white p-3 shadow-sm cursor-pointer`}
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )
                }
              >
                <div className=" flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md ${category.bgColor} p-1.5`}>
                      <div className={category.textColor}>{category.icon}</div>
                    </div>
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Subcategory Cards */}
              {expandedCategory === category.id && (
                <div className="grid gap-1 pl-4">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className={`rounded-lg border bg-white p-3 shadow-sm transition-all ${
                        selectedSubcategory === subcategory.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {subcategory.name}
                        </span>
                        {selectedSubcategory !== subcategory.id ? (
                          <button
                            onClick={() =>
                              setSelectedSubcategory(subcategory.id)
                            }
                            className={`rounded-md ${category.color} px-2 py-1 text-xs font-medium text-white`}
                          >
                            Set Target
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedSubcategory(null)}
                            className="rounded-full p-1 hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                      </div>

                      {selectedSubcategory === subcategory.id && (
                        <div className="mt-3 space-y-2">
                          <div className="relative">
                            <IndianRupee className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                            <input
                              type="number"
                              value={targetAmount}
                              onChange={(e) => setTargetAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleSubmit(category.id, subcategory.id)
                            }
                            disabled={loading}
                            className={`w-full rounded-md py-1.5 text-xs font-medium text-white transition-colors ${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : `${category.color} hover:opacity-90`
                            }`}
                          >
                            {loading ? "Setting..." : "Confirm"}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BudgetList budgetData={budgetData} />
    </div>
  );
};

export default ExpenseTarget;

import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BudgetList = ({ budgetData }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food & Dining":
        return <IndianRupee className="w-6 h-6" />;
      default:
        return <IndianRupee className="w-6 h-6" />;
    }
  };

  const groupedBudgets = budgetData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const calculateCategoryTotal = (items) => {
    return items.reduce((total, item) => {
      const amt = total + (item.targetAmount || 0);
      return amt;
    }, 0);
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3 mt-2 rounded sm:p-6 md:p-8 lg:p-10  bg-gradient-to-r from-orange-100 via-white to-blue-100">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
          My Financial Plan for This Month and Upcoming Travels
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 md:gap-8">
          {Object.entries(groupedBudgets).map(([category, items]) => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Category Header */}
              <div className="px-3 sm:px-4 py-2 bg-gray-50 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-blue-600">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 truncate">
                    {category}
                  </h2>
                </div>
              </div>

              {/* Budget Items */}
              <div className="p-2 sm:p-3 space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="px-2 sm:p-3 border border-amber-300 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <div className="w-full sm:w-auto">
                        <p className="font-medium text-sm sm:text-base text-gray-800 truncate">
                          {item.subcategory}
                        </p>
                        {item.setAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            on: {new Date(item.setAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        {item.targetAmount && (
                          <p className="font-semibold text-sm sm:text-base text-green-600">
                            ₹{item.targetAmount.toLocaleString()}
                          </p>
                        )}
                        {item.spending && (
                          <p className="text-xs sm:text-sm text-gray-600">
                            Spent: ₹{item.spending.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Total */}
              <div className="p-3 sm:p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm sm:text-base text-gray-700">
                    Category Total
                  </span>
                  <span className="font-bold text-sm sm:text-base text-blue-600">
                    ₹{calculateCategoryTotal(items).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 mx-auto p-2  ">
        <VisualizeBudgetData budgetData={budgetData} />
      </div>
    </div>
  );
};
