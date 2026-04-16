import React, { useEffect, useState } from "react";
import "../styles/inventory.css";

function Inventory() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    unit: "",
    threshold: "",
  });

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    const res = await fetch("http://localhost:5000/api/inventory");
    const data = await res.json();
    setItems(data || []);
  }

  async function addItem() {
    if (!form.item_name || !form.quantity || !form.unit || !form.threshold) {
      alert("Please fill all fields");
      return;
    }

    await fetch("http://localhost:5000/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        threshold: Number(form.threshold),
      }),
    });

    setForm({
      item_name: "",
      quantity: "",
      unit: "",
      threshold: "",
    });

    loadInventory();
  }

  async function updateItem(id, newQty) {
    if (newQty < 0) return;

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });

    loadInventory();
  }

  async function deleteItem(id) {
    if (!window.confirm("Delete this item?")) return;

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "DELETE",
    });

    loadInventory();
  }

  return (
    <div className="inventory-container">
      <h2>📦 Inventory</h2>

      {/* FORM */}
      <div className="inventory-form">
        <input
          placeholder="Item Name"
          value={form.item_name}
          onChange={(e) =>
            setForm({ ...form, item_name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          placeholder="Unit (kg/L)"
          value={form.unit}
          onChange={(e) =>
            setForm({ ...form, unit: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Threshold"
          value={form.threshold}
          onChange={(e) =>
            setForm({ ...form, threshold: e.target.value })
          }
        />

        <button className="add-btn" onClick={addItem}>
          + Add
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const qty = Number(item.quantity);
              const isLow = qty <= item.threshold;

              return (
                <tr key={item.id} className={isLow ? "low-stock" : ""}>
                  <td className="item-name">{item.item_name}</td>

                  <td>{qty}</td>
                  <td>{item.unit}</td>

                  <td>
                    <span className={`status-badge ${isLow ? "low" : "ok"}`}>
                      {isLow ? "Low" : "OK"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button
                      className="btn minus"
                      onClick={() => updateItem(item.id, qty - 1)}
                    >
                      -1
                    </button>

                    <button
                      className="btn plus"
                      onClick={() => updateItem(item.id, qty + 1)}
                    >
                      +1
                    </button>

                    <button
                      className="btn delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;