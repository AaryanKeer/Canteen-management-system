import React, { useEffect, useState, useRef } from "react";
import "../styles/kitchen.css";
import { io } from "socket.io-client";

function KitchenOrders() {
  const [orders, setOrders] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    loadOrders();

    audioRef.current = new Audio("/sounds/bell sound.mp3");
    audioRef.current.volume = 0.5;

    const socket = io("http://localhost:5000");

    socket.on("newOrder", () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      loadOrders();
    });

    socket.on("orderUpdated", () => {
      loadOrders();
    });

    return () => socket.disconnect();
  }, []);

  async function loadOrders() {
    const res = await fetch("http://localhost:5000/api/orders");
    const data = await res.json();
    setOrders(data || []);
  }

  async function updateStatus(id, status) {
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadOrders();
  }

  const activeOrders = orders.filter(
    (order) => order.status !== "completed"
  );

  function getStatusClass(status) {
    return `status ${status}`;
  }

  return (
    <div className="kitchen-container">
      <h3>🔥 Active Orders</h3>

      {activeOrders.length === 0 ? (
        <p>No active orders</p>
      ) : (
        activeOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <h4>{order.order_no}</h4>
              <span className={getStatusClass(order.status)}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items?.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.qty}
                </p>
              ))}
            </div>

            <div className="buttons">
              {order.status === "pending" && (
                <button
                  className="btn primary"
                  onClick={() =>
                    updateStatus(order.id, "preparing")
                  }
                >
                  Start
                </button>
              )}

              {order.status === "preparing" && (
                <button
                  className="btn blue"
                  onClick={() =>
                    updateStatus(order.id, "ready")
                  }
                >
                  Ready
                </button>
              )}

              {order.status === "ready" && (
                <button
                  className="btn green"
                  onClick={() =>
                    updateStatus(order.id, "completed")
                  }
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default KitchenOrders;