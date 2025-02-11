import React, { useState, useEffect, useRef } from "react";
import {
  CreditCard,
  IndianRupee,
  FileText,
  Home,
  Contact,
  User,
  LogOut,
  Menu,
  X,
  ShieldQuestion,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const NavItems = [
  { id: 1, title: "Dashboard", path: "/dashboard", icon: Home },
  { id: 2, title: "Budget", path: "/budget", icon: IndianRupee },
  { id: 3, title: "Expenses", path: "/expenses", icon: CreditCard },
  { id: 4, title: "Reports", path: "/reports", icon: FileText },
  { id: 5, title: "FAQ", path: "/faq", icon: ShieldQuestion },
];

const UserMenuItems = [
  { id: 1, title: "Contact Us", path: "/contact", icon: Contact },
  { id: 2, title: "Logout", path: "/", icon: LogOut },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-300 shadow-md border-b sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              YatraWallet
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {NavItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* User Menu - Desktop */}
          <div
            className="hidden md:flex items-center relative"
            ref={userMenuRef}
          >
            <button
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsMobileMenuOpen(false); // Close mobile menu when opening user menu
              }}
            >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-sm">Bikas</span>
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="absolute  right-0 mt-32 w-32 bg-white rounded-md shadow-lg py-1">
                {UserMenuItems.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.id}
                    className="border-amber-100 flex items-center px-4  text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsUserMenuOpen(false); // Close user menu when opening mobile menu
              }}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3" ref={mobileMenuRef}>
            <div className="space-y-1">
              {NavItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
              <div className="border-t border-gray-200 my-2"></div>
              {UserMenuItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
