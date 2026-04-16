import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
  { title: "New Order", icon: "📝", path: "/new-order" },
  { title: "Kitchen Orders", icon: "👨‍🍳", path: "/kitchen-orders" },
  { title: "Inventory", icon: "📦", path: "/inventory" },
  { title: "Menu", icon: "🍔", path: "/menu" },
];

  return (
    <div className="cards-section">
      {actions.map((item, index) => (
        <div
          key={index}
          className="action-card"
          onClick={() =>
            item.path ? navigate(item.path) : item.action()
          }
        >
          <div className="icon">{item.icon}</div>
          <div className="title">{item.title}</div>
        </div>
      ))}
    </div>
  );
}

export default QuickActions;