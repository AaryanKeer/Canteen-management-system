import React, { useEffect, useState } from "react";
import { getMenu, addMenuItem, toggleMenuStatus } from "../services/api";
import "../styles/menu.css";

function MenuManagement() {
  const [menu, setMenu] = useState([]);

  const [form, setForm] = useState({
    item_name: "",
    category: "breakfast",
    type: "veg",
    price: "",
    image_url: "",
  });

  async function loadMenu() {
    const data = await getMenu();
    setMenu(data);
  }

  useEffect(() => {
    loadMenu();
  }, []);

  

  async function handleAdd() {
    await addMenuItem(form);
    setForm({
      item_name: "",
      category: "breakfast",
      type: "veg",
      price: "",
      image_url: "",
    });
    loadMenu();
  }

  async function handleToggle(id, currentStatus) {
    await toggleMenuStatus(id, !currentStatus);
    loadMenu();
  }

  return (
    <div className="menu-container">
      <h2>Menu Management</h2>

      {/* Add Item Form */}
      <div className="menu-form">
        <input
          placeholder="Item Name"
          value={form.item_name}
          onChange={(e) =>
            setForm({ ...form, item_name: e.target.value })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) =>
            setForm({ ...form, image_url: e.target.value })
          }
        />

        <button onClick={handleAdd}>Add Item</button>
      </div>

      {/* Menu List */}
      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item.id}>
            <div className="image-placeholder">
              {item.image_url ? (
                <img src={item.image_url} alt="" />
              ) : (
                "No Image"
              )}
            </div>

            <h3>{item.item_name}</h3>
            <p>₹{item.price}</p>
            <p>{item.category}</p>
            <p>{item.type}</p>

            <button
              className={item.available ? "available" : "unavailable"}
              onClick={() =>
                handleToggle(item.id, item.available)
              }
            >
              {item.available ? "Available" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuManagement;