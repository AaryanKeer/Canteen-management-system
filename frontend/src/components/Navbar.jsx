import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="navbar">
      {/* Left */}
      <div className="nav-left">
        <div className="logo">🍽️</div>
        <div className="system-name">
          Hospital Canteen
        </div>
      </div>

      {/* Right */}
      <div className="nav-right">
        <span className="role-badge">{role}</span>

        <span className="user-name">
          {name || "User"}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;