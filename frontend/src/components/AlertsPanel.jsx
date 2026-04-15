import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();

    const socket = io("http://localhost:5000");

    // 🔥 Listen for inventory updates
    socket.on("inventoryUpdated", () => {
      console.log("Inventory updated → checking alerts");
      loadAlerts();
    });

    return () => socket.disconnect();
  }, []);

  async function loadAlerts() {
    try {
      const res = await fetch("http://localhost:5000/api/inventory/low");
      const data = await res.json();

      setAlerts(data || []); // ✅ safe fallback
    } catch (err) {
      console.error("Error loading alerts:", err);
    }
  }

  return (
    <div className="alerts-section">
      <h3>Alerts</h3>

      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        alerts.map((item) => (
          <p key={item.id}>
            ⚠️ {item.item_name} is low ({item.quantity} {item.unit} left)
          </p>
        ))
      )}
    </div>
  );
}

export default AlertsPanel;