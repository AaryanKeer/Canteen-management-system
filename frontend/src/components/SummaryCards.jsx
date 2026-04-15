import React from "react";

function SummaryCards({ stats }) {
  return (
    <div className="summary-section">
      <div className="summary-card">
        <h3>{stats.todayOrders || 0}</h3>
        <p>Orders Today</p>
      </div>

      <div className="summary-card">
        <h3>₹{stats.todayRevenue || 0}</h3>
        <p>Revenue Today</p>
      </div>

      <div className="summary-card">
        <h3>{stats.pending || 0}</h3>
        <p>Pending Orders</p>
      </div>

      <div className="summary-card">
        <h3>{stats.completed || 0}</h3>
        <p>Completed Orders</p>
      </div>

      <div className="summary-card">
        <h3>{stats.mostItem || "N/A"}</h3>
        <p>Most Ordered Item</p>
      </div>
    </div>
  );
}

export default SummaryCards;