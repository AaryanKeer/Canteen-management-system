const db = require("../config/db");

function getInventory() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM inventory", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function addInventory(item) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO inventory (item_name, quantity, unit, threshold) VALUES (?, ?, ?, ?)",
      [item.item_name, item.quantity, item.unit, item.threshold],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

function updateInventory(id, quantity) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE inventory SET quantity = ? WHERE id = ?",
      [quantity, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

function getLowStock() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM inventory WHERE quantity < threshold",
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
}

function deleteInventory(id) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM inventory WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  getLowStock,
  deleteInventory
};