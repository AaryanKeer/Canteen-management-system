import React, { useEffect, useState } from "react";
import { getMenu, createOrder } from "../services/api";
import "../styles/order.css";

function NewOrder() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // Load menu
  useEffect(() => {
    async function fetchMenu() {
      const data = await getMenu();
      setMenu(data);
    }
    fetchMenu();
  }, []);

  function addToCart(item) {
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function getTotal() {
    return cart.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  }

  // ✅ FINAL FIXED PLACE ORDER FUNCTION
  async function handlePlaceOrder() {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      // ✅ MUST have valid user_id
      const user_id = 4; // receptionist id

      if (!user_id) {
        alert("User not logged in properly. Please login again.");
        return;
      }

      const orderData = {
        user_id,
        total_amount: getTotal(),
        cart,
      };

      console.log("Sending order:", orderData);

      const res = await createOrder(orderData);

      if (res && res.order) {
        alert("Order Placed: " + res.order.orderNo);
        setCart([]);
      } else {
        console.error("Order failed:", res);
        alert("Order failed. Check console.");
      }

    } catch (err) {
      console.error("Server error:", err);
      alert("Server error while placing order");
    }
  }

  const filteredMenu = menu.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="order-container">
      
      {/* Left Side */}
      <div className="menu-section">
        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className={`menu-card ${!item.available ? "disabled" : ""}`}
              onClick={() => item.available && addToCart(item)}
            >
              <div className="image">
                {item.image_url ? (
                  <img src={item.image_url} alt="" />
                ) : (
                  "No Image"
                )}
              </div>

              <h4>{item.item_name}</h4>
              <p>₹{item.price}</p>
              <p>{item.type}</p>

              {!item.available && <span>Out of Stock</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="cart-section">
        <h3>Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.item_name}</span>
            <span>x{item.qty}</span>
            <span>₹{item.price * item.qty}</span>
            <button onClick={() => removeFromCart(item.id)}>X</button>
          </div>
        ))}

        <h3>Total: ₹{getTotal()}</h3>

        <button className="place-order" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default NewOrder;