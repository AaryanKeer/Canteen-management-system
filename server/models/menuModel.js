const db = require("../config/db");

function getAllMenuItems() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM menu_items", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addMenuItem(item) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO menu_items (item_name, category, type, price, image_url) VALUES (?, ?, ?, ?, ?)",
      [item.item_name, item.category, item.type, item.price, item.image_url],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

function updateAvailability(id, available) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE menu_items SET available = ? WHERE id = ?",
      [available, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateAvailability,
};