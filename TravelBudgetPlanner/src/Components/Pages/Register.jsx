import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLogedin, setIsLogedIn] = useState(false);

  useEffect(() => {
    const token = Boolean(localStorage.getItem("authToken"));
    setIsLogedIn(token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("authToken", "vikash");
    setIsLogedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    setIsLogedIn(false);
  };

  return (
    <>
      <h1 className="text-6xl text-center">Welcome users</h1>

      <h1 className="mt-20 text-2xl text-center ">
        {isLogedin ? "You are Logged in 🤩" : "You are NOT Logged in 😔"}
      </h1>
      <div className="flex justify-center gap-1 mt-4">
        {isLogedin ? (
          <button
            className="border-2 border-red-600 px-4 py-2 bg-red-500 text-white hover:bg-red-400 hover:text-black"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="border-2 border-red-600 px-4 py-2 bg-red-500 text-white hover:bg-red-400 hover:text-black"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Register;
