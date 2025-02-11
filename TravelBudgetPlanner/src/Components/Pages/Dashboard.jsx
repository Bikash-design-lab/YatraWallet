import React, { useEffect, useState } from "react";
import TravelPlaner from "../../assets/TravelPlaner.jpg";
import { Plane, DollarSign, Bell, LineChart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <TravelHero />
    </div>
  );
};

export default Dashboard;

const TravelHero = () => {
  const features = [
    {
      icon: <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
      text: "Set a spending limit for every travel category",
    },
    {
      icon: <LineChart className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
      text: "Track expenses live as you spend",
    },
    {
      icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />,
      text: "Get instant alerts if you exceed your budget",
    },
    {
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
      text: "Stay in control and enjoy a worry-free trip",
    },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden mt-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${TravelPlaner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Header */}
        <h1 className="text-center font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4">
          <span className="inline-block transform hover:scale-105 transition-transform duration-200">
            🌍 Travel Budget Planner:
          </span>
          <br className="sm:hidden" />
          <span className="inline-block text-blue-300 transform hover:scale-105 transition-transform duration-200 mt-2 sm:mt-0">
            Stay on Track & Spend Smart! ✈️
          </span>
        </h1>

        {/* Description */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto px-4 sm:px-6">
            Plan & Manage Your Travel Expenses with Ease. A well-planned budget
            is the key to a stress-free journey! Set spending limits for each
            category—Accommodation, Food, Transportation, Activities, and
            Emergency Funds—and track your expenses in real-time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 px-4 sm:px-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-2 flex items-center space-x-3 sm:space-x-4 bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white/95"
            >
              <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-sm">
                {feature.icon}
              </div>
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-8">
          <Link to="/budget">
            <button className="border-1 border-black bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md">
              Start Planning Now
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ------------------------------------------------------------------------------------

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show footer when cursor is near the bottom (within 50px from bottom)
      if (window.innerHeight - e.clientY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer
      className={`bg-gradient-to-r from-orange-100 via-white to-blue-100 text-gray-700 fixed bottom-0 left-0 w-full h-10 flex items-center transition-all duration-300 ${
        isVisible
          ? "opacity-85 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center w-full">
        {/* Logo & App Name */}
        <div className="text-sm font-bold text-gray-900">YatraWallet</div>

        {/* Navigation Links */}
        <div className="flex space-x-4 text-xs">
          <NavLink
            to="/dashboard"
            className="hover:text-blue-500 transition cursor-pointer"
          >
            Home
          </NavLink>
          <NavLink
            to="/faq"
            className="hover:text-blue-500 transition cursor-pointer"
          >
            FAQ
          </NavLink>
          <NavLink
            to="/reports"
            className="hover:text-blue-500 transition cursor-pointer"
          >
            Reports
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-blue-500 transition cursor-pointer"
          >
            Contact
          </NavLink>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-3">
          <a href="#" className="text-gray-700 hover:text-blue-500 transition">
            <Facebook size={14} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 transition">
            <Twitter size={14} />
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 transition">
            <Instagram size={14} />
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-orange-500 transition"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
