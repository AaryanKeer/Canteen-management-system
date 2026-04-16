import React, { useEffect, useState } from "react";
import { getMenu, createOrder } from "../services/api";
import "../styles/order.css";

function NewOrder() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const data = await getMenu();
      setMenu(data || []);
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

  async function handlePlaceOrder() {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const user_id = 4;

      const orderData = {
        user_id,
        total_amount: getTotal(),
        cart,
      };

      const res = await createOrder(orderData);

      if (res && res.order) {
        alert("Order Placed: " + res.order.orderNo);
        setCart([]);
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  const filteredMenu = menu.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pos-container">

      {/* LEFT → MENU */}
      <div className="menu-section">
        <input
          className="search"
          placeholder="🔍 Search food..."
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
                  <div className="no-img">🍽️</div>
                )}
              </div>

              <h4>{item.item_name}</h4>
              <p>₹{item.price}</p>

              {!item.available && <span className="out">Out of Stock</span>}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT → CART */}
      <div className="cart-section">
        <h3>🧾 Order Summary</h3>

        {cart.length === 0 ? (
          <p className="empty">No items added</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p className="item-name">{item.item_name}</p>
                <p className="qty">x{item.qty}</p>
              </div>

              <div className="right">
                <span>₹{item.price * item.qty}</span>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </div>
            </div>
          ))
        )}

        <div className="total">
          Total: ₹{getTotal()}
        </div>

        <button className="place-order" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default NewOrder;