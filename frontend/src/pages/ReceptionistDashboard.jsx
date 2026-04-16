import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewOrder from "./NewOrder";
import "../styles/receptionDashboard.css";

function ReceptionistDashboard() {
  const navigate = useNavigate();

  return (
    <div className="reception-dashboard">
      <Navbar />

      <div className="reception-content">
        {/* Header */}
        <div className="reception-header">
          <h2>💳 Reception POS</h2>
          <p>Create and manage customer orders</p>
        </div>

        {/* Quick Actions */}
        <div className="reception-actions">
          <div
            className="reception-card"
            onClick={() => navigate("/new-order")}
          >
            📝 New Order
          </div>

          <div
            className="reception-card"
            onClick={() => navigate("/kitchen-orders")}
          >
            📋 Orders
          </div>
        </div>

        {/* POS Layout */}
        <div className="reception-orders-section">
          <NewOrder />
        </div>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;