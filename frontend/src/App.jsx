import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import KitchenDashboard from "./pages/KitchenDashboard";
import MenuManagement from "./pages/MenuManagement";
import NewOrder from "./pages/NewOrder";
import KitchenOrders from "./pages/KitchenOrders";
import Inventory from "./pages/Inventory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Receptionist */}
        <Route
          path="/reception"
          element={
            <ProtectedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Kitchen */}
        <Route
          path="/kitchen"
          element={
            <ProtectedRoute allowedRoles={["kitchen"]}>
              <KitchenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared / Controlled */}
        <Route
          path="/new-order"
          element={
            <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
              <NewOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kitchen-orders"
          element={
            <ProtectedRoute allowedRoles={["kitchen", "admin"]}>
              <KitchenOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["kitchen", "admin"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MenuManagement />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            token ? (
              role === "admin" ? <Navigate to="/admin" /> :
              role === "receptionist" ? <Navigate to="/reception" /> :
              <Navigate to="/kitchen" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;