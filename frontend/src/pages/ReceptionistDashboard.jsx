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

      {/* Header */}
      <div className="reception-header">
        <h2>Receptionist Dashboard</h2>
        <p>Create and manage customer orders</p>
      </div>

      {/* Quick Actions */}
      <div className="reception-actions">
        <div
          className="reception-card"
          onClick={() => navigate("/new-order")}
        >
          Create New Order
        </div>

        <div
          className="reception-card"
          onClick={() => navigate("/kitchen-orders")}
        >
          View Orders
        </div>
      </div>

      {/* Order Section */}
      <div className="reception-orders-section">
        <NewOrder />
      </div>

    </div>
  );
}

export default ReceptionistDashboard;