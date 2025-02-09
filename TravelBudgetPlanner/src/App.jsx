import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Common/Navbar";
import Team from "./Components/Pages/Team";
import Dashboard from "./Components/Pages/Dashboard";
import Budget from "./Components/Pages/Budget";
import Expenses from "./Components/Pages/Expenses";
import Reports from "./Components/Pages/Reports";
import Register from "./Components/Pages/Register";
import NotFound from "./Components/Pages/NotFound";
import ContactUS from "./Components/Pages/ContactUs";
import FAQPage from "./Components/Pages/FAQPage";
import ProtectedRoutes from "./Components/Utils/ProtectedRoutes";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Register" />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Expenses"
          element={
            <ProtectedRoutes>
              <Expenses />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Reports"
          element={
            <ProtectedRoutes>
              <Reports />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Budget"
          element={
            <ProtectedRoutes>
              <Budget />
            </ProtectedRoutes>
          }
        />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Team"
          element={
            <ProtectedRoutes>
              <Team />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <ProtectedRoutes>
              <ContactUS />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/FAQPage"
          element={
            <ProtectedRoutes>
              <FAQPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
