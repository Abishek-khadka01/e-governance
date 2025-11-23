import { Route, Routes } from "react-router-dom";
import AdminLogin from "../auth/Login";
import AdminDashboard from "../pages/dashboard";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};
