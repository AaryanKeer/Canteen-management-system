import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import QuickActions from "../components/QuickActions";
import SummaryCards from "../components/SummaryCards";
import AlertsPanel from "../components/AlertsPanel";
import RecentOrdersTable from "../components/RecentOrdersTable";
import Charts from "../components/Charts";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("http://localhost:5000/api/orders/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Hospital Canteen Dashboard</h2>
          <p>Manage orders, inventory and operations</p>
        </div>

        <QuickActions />

        <SummaryCards stats={stats} />

        <Charts />

        <div className="grid-2">
          <AlertsPanel />
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;