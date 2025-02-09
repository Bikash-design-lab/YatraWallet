import React from "react";
import { Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Expenses" element={<Expenses />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Budget" element={<Budget />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/ContactUs" element={<ContactUS />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/FAQPage" element={<FAQPage />} />
      </Routes>
    </>
  );
}

export default App;
