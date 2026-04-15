import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function RecentOrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();

    const socket = io("http://localhost:5000");

    // 🔥 When new order comes → reload
    socket.on("newOrder", () => {
      console.log("Admin: New order received");
      loadOrders();
    });

    // 🔥 When order status updates → reload
    socket.on("orderUpdated", () => {
      console.log("Admin: Order updated");
      loadOrders();
    });

    return () => socket.disconnect();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetch("http://localhost:5000/api/orders/recent");
      const data = await res.json();

      setOrders(data || []); // ✅ safe fallback
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  }

  return (
    <div className="orders-section">
      <h3>Recent Orders</h3>

      <table>
        <thead>
          <tr>
            <th>Order No</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4">No orders yet</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_no}</td>
                <td>₹{order.total_amount}</td>
                <td>{order.order_status}</td>
                <td>
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
  );
}

export default RecentOrdersTable;