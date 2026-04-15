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
    setItems(data);
  }

  async function addItem() {
    // ✅ Validation
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
    if (newQty < 0) return; // ✅ prevent negative

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    loadInventory();
  }

  async function deleteItem(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/inventory/${id}`, {
      method: "DELETE",
    });

    loadInventory();
  }

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>

      {/* Add Item */}
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
          Add
        </button>
      </div>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Threshold</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const qty = Number(item.quantity);

            return (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{qty}</td>
                <td>{item.unit}</td>
                <td>{item.threshold}</td>

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
  );
}

export default Inventory;