import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "../styles/RecentOrdersTable.css";

function RecentOrdersTable() {
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
    try {
      const res = await fetch("http://localhost:5000/api/orders/recent");
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  }

  // 🔥 status color class
  function getStatusClass(status) {
    if (status === "pending") return "status pending";
    if (status === "preparing") return "status preparing";
    if (status === "ready") return "status ready";
    if (status === "completed") return "status completed";
    return "status";
  }

  return (
    <div className="orders-section">
      <h3>📋 Recent Orders</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-no">{order.order_no}</td>

                  <td className="amount">
                    ₹{order.total_amount}
                  </td>

                  <td>
                    <span className={getStatusClass(order.order_status)}>
                      {order.order_status}
                    </span>
                  </td>

                  <td className="date">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrdersTable;