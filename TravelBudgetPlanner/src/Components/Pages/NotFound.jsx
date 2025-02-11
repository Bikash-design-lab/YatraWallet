import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
const NotFound = () => {
  // const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  };

  const errorCodeStyle = {
    fontSize: "120px",
    fontWeight: "bold",
    color: "#e74c3c",
    margin: "0",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  };

  const messageStyle = {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "20px",
  };

  const linkStyle = {
    backgroundColor: "rgb(43, 43, 238)",
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div
      style={pageStyle}
      className=" bg-gradient-to-r from-orange-100 via-white to-blue-100"
    >
      <h1 style={errorCodeStyle}>404</h1>
      <p style={messageStyle}>Oops! Page Not Found</p>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => navigate("/dashboard")}
        style={linkStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = "rgb(90, 90, 249)")
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = "rgb(43, 43, 238)")
        }
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
