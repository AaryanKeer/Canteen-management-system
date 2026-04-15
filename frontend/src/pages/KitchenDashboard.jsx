import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import KitchenOrders from "./KitchenOrders";
import "../styles/kitchenDashboard.css";

function KitchenDashboard() {
  const navigate = useNavigate();

  return (
    <div className="kitchen-dashboard">
      
      <Navbar />

      {/* Header */}
      <div className="kitchen-header">
        <h2>Kitchen Dashboard</h2>
        <p>Manage and prepare incoming orders</p>
      </div>

      {/* Quick Actions */}
      <div className="kitchen-actions">
        <div
          className="kitchen-card"
          onClick={() => navigate("/kitchen-orders")}
        >
          View Orders
        </div>

        <div
          className="kitchen-card"
          onClick={() => navigate("/inventory")}
        >
          Manage Inventory
        </div>
      </div>

      {/* Orders Section */}
      <div className="kitchen-orders-section">
        <KitchenOrders />
      </div>

    </div>
  );
}

export default KitchenDashboard;