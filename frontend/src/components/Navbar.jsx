import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // ✅ get role

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="logo">[Logo]</div>

      <div className="system-name">
        Hospital Canteen Management System
      </div>

      <div className="user-info">
        Welcome, {role} |{" "}
        <span
          onClick={handleLogout}
          style={{ cursor: "pointer", color: "yellow" }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export default Navbar;