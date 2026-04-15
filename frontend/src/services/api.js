const API_URL = "http://localhost:5000/api";

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}


export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  return res.json();
}

export async function addMenuItem(item) {
  const res = await fetch(`${API_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function toggleMenuStatus(id, available) {
  const res = await fetch(`${API_URL}/menu/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ available }),
  });
  return res.json();
}

export async function createOrder(orderData) {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return res.json();
}