import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Common/Navbar";
import Dashboard from "./Components/Pages/Dashboard";
import Budget from "./Components/Pages/Budget";
import Expenses from "./Components/Pages/Expenses";
import Reports from "./Components/Pages/Reports";
import Register from "./Components/Pages/Register";
import NotFound from "./Components/Pages/NotFound";
import ContactUs from "./Components/Pages/ContactUs";
import FAQPage from "./Components/Pages/FAQPage";
import ProtectedRoutes from "./Components/Utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Redirect "/" to "/register" */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Group */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";
// import Navbar from "./Components/Common/Navbar";
// import Dashboard from "./Components/Pages/Dashboard";
// import Budget from "./Components/Pages/Budget";
// import Expenses from "./Components/Pages/Expenses";
// import Reports from "./Components/Pages/Reports";
// import Register from "./Components/Pages/Register";
// import NotFound from "./Components/Pages/NotFound";
// import ContactUS from "./Components/Pages/ContactUs";
// import FAQPage from "./Components/Pages/FAQPage";
// import ProtectedRoutes from "./Components/Utils/ProtectedRoutes";
// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/Register" />} />
//         <Route
//           path="/Dashboard"
//           element={
//             <ProtectedRoutes>
//               <Dashboard />
//             </ProtectedRoutes>
//           }
//         />
//         <Route
//           path="/Expenses"
//           element={
//             <ProtectedRoutes>
//               <Expenses />
//             </ProtectedRoutes>
//           }
//         />
//         <Route
//           path="/Reports"
//           element={
//             <ProtectedRoutes>
//               <Reports />
//             </ProtectedRoutes>
//           }
//         />
//         <Route
//           path="/Budget"
//           element={
//             <ProtectedRoutes>
//               <Budget />
//             </ProtectedRoutes>
//           }
//         />
//         <Route path="/Register" element={<Register />} />
//         <Route
//           path="/ContactUs"
//           element={
//             <ProtectedRoutes>
//               <ContactUS />
//             </ProtectedRoutes>
//           }
//         />
//         <Route path="*" element={<NotFound />} />
//         <Route
//           path="/FAQPage"
//           element={
//             <ProtectedRoutes>
//               <FAQPage />
//             </ProtectedRoutes>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
