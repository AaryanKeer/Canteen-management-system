import React, { useEffect, useState } from "react";
import "../styles/kitchen.css";
import { io } from "socket.io-client";

function KitchenOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();

    const socket = io("http://localhost:5000");

    // ✅ FIX: reload instead of pushing raw order
    socket.on("newOrder", () => {
      console.log("New order received");
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
    setOrders(data);
  }

  async function updateStatus(id, status) {
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadOrders();
  }

  return (
    <div className="kitchen-container">
      <h2>Kitchen Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h3>{order.order_no}</h3>
          <p>Status: {order.status}</p>

          <div>
            {order.items?.map((item, i) => ( // ✅ safe optional chaining
              <p key={i}>
                {item.name} x {item.qty}
              </p>
            ))}
          </div>

          <div className="buttons">
            <button onClick={() => updateStatus(order.id, "preparing")}>
              Preparing
            </button>
            <button onClick={() => updateStatus(order.id, "ready")}>
              Ready
            </button>
            <button onClick={() => updateStatus(order.id, "completed")}>
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KitchenOrders;