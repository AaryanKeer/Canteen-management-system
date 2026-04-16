import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "../styles/AlertsPanel.css";

function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  const audioRef = useRef(null);

  useEffect(() => {
    loadAlerts();

    audioRef.current = new Audio("/sounds/alert notification sound.mp3");
    audioRef.current.volume = 0.5;

    const socket = io("http://localhost:5000");

    socket.on("inventoryUpdated", async () => {
      console.log("Inventory updated → checking alerts");

      try {
        const res = await fetch("http://localhost:5000/api/inventory/low");
        const data = await res.json();

        if (data && data.length > 0) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }

        setAlerts(data || []);
      } catch (err) {
        console.error("Error loading alerts:", err);
      }
    });

    return () => socket.disconnect();
  }, []);

  async function loadAlerts() {
    try {
      const res = await fetch("http://localhost:5000/api/inventory/low");
      const data = await res.json();
      setAlerts(data || []);
    } catch (err) {
      console.error("Error loading alerts:", err);
    }
  }

  return (
    <div className="alerts-section">
      <h3>⚠️ Alerts</h3>

      {alerts.length === 0 ? (
        <div className="no-alert">✅ All items are sufficient</div>
      ) : (
        <div className="alerts-list">
          {alerts.map((item) => (
            <div className="alert-card" key={item.id}>
              <div className="alert-icon">⚠️</div>

              <div className="alert-content">
                <p className="alert-title">{item.item_name}</p>
                <p className="alert-desc">
                  Only {item.quantity} {item.unit} left
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsPanel;