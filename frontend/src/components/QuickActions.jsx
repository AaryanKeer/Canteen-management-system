import React from "react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="cards-section">

      <div className="card" onClick={() => navigate("/new-order")}>
        New Order
      </div>

      <div className="card" onClick={() => navigate("/kitchen-orders")}>
        Kitchen Orders
      </div>

      <div className="card" onClick={() => navigate("/inventory")}>
        Inventory
      </div>

      <div className="card" onClick={() => navigate("/menu")}>
        Menu
      </div>

      <div className="card" onClick={() => alert("Reports coming soon")}>
        Reports
      </div>

      <div className="card" onClick={() => navigate("/admin")}>
        Dashboard
      </div>

    </div>
  );
}

export default QuickActions;