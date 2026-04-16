import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      if (!username || !password) {
        alert("Enter username & password");
        return;
      }

      const data = await loginUser(username, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        const userId = data.user?.id || data.id || 1;
        localStorage.setItem("user_id", userId);

        if (data.role === "admin") navigate("/admin");
        else if (data.role === "receptionist") navigate("/reception");
        else navigate("/kitchen");

      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo">🍽️</div>

        <h2>Canteen Management</h2>
        <p className="subtitle">Login to continue</p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;