import React from "react";
import "../styles/SummaryCards.css";

function SummaryCards({ stats }) {
  const data = [
    {
      title: "Orders Today",
      value: stats.todayOrders || 0,
      color: "var(--primary)",
    },
    {
      title: "Revenue Today",
      value: `₹${stats.todayRevenue || 0}`,
      color: "var(--secondary)",
    },
    {
      title: "Pending Orders",
      value: stats.pending || 0,
      color: "var(--pending)",
    },
    {
      title: "Completed Orders",
      value: stats.completed || 0,
      color: "var(--completed)",
    },
    {
      title: "Most Ordered",
      value: stats.mostItem || "N/A",
      color: "var(--preparing)",
    },
  ];

  return (
    <div className="summary-section">
      {data.map((item, index) => (
        <div className="summary-card" key={index}>
          <div
            className="summary-top"
            style={{ background: item.color }}
          />
          <h2 className="summary-value">{item.value}</h2>
          <p className="summary-title">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;