const db = require("../config/db");

function findUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)",
      [user.name, user.username, user.password, user.role],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = {
  findUserByUsername,
  createUser,
};