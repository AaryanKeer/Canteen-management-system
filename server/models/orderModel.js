const db = require("../config/db");

function createOrder(order, items) {
  return new Promise((resolve, reject) => {
    const orderNo = "ORD" + Date.now();

    db.query(
      "INSERT INTO orders (order_no, created_by, total_amount) VALUES (?, ?, ?)",
      [orderNo, order.created_by, order.total_amount],
      (err, result) => {
        if (err) return reject(err);

        const orderId = result.insertId;

        const values = items.map((item) => [
          orderId,
          item.id,
          item.qty,
          item.price,
        ]);

        db.query(
          "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?",
          [values],
          (err2) => {
            if (err2) return reject(err2);

            resolve({ orderId, orderNo });
          }
        );
      }
    );
  });
}

function getAllOrders() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT o.*, oi.menu_item_id, oi.quantity, oi.price, m.item_name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu_items m ON oi.menu_item_id = m.id
      ORDER BY o.created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) reject(err);

      // Group items by order
      const ordersMap = {};

      results.forEach((row) => {
        if (!ordersMap[row.id]) {
          ordersMap[row.id] = {
            id: row.id,
            order_no: row.order_no,
            status: row.order_status,
            total: row.total_amount,
            items: [],
          };
        }

        ordersMap[row.id].items.push({
          name: row.item_name,
          qty: row.quantity,
          price: row.price,
        });
      });

      resolve(Object.values(ordersMap));
    });
  });
}

function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE orders SET order_status = ? WHERE id = ?",
      [status, orderId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

function getDashboardStats() {
  return new Promise((resolve, reject) => {
    const queries = {
      totalOrders: "SELECT COUNT(*) as total FROM orders",
      completed: "SELECT COUNT(*) as total FROM orders WHERE order_status = 'completed'",
      pending: "SELECT COUNT(*) as total FROM orders WHERE order_status = 'pending'",
      todayOrders: `
        SELECT COUNT(*) as total FROM orders 
        WHERE DATE(created_at) = CURDATE()
      `,
      todayRevenue: `
        SELECT IFNULL(SUM(total_amount),0) as total FROM orders 
        WHERE DATE(created_at) = CURDATE()
      `,
      mostItem: `
        SELECT m.item_name, COUNT(*) as count 
        FROM order_items oi
        JOIN menu_items m ON oi.menu_item_id = m.id
        GROUP BY oi.menu_item_id
        ORDER BY count DESC
        LIMIT 1
      `
    };

    Promise.all([
      new Promise((res, rej) => db.query(queries.totalOrders, (e, r) => e ? rej(e) : res(r[0]))),
      new Promise((res, rej) => db.query(queries.completed, (e, r) => e ? rej(e) : res(r[0]))),
      new Promise((res, rej) => db.query(queries.pending, (e, r) => e ? rej(e) : res(r[0]))),
      new Promise((res, rej) => db.query(queries.todayOrders, (e, r) => e ? rej(e) : res(r[0]))),
      new Promise((res, rej) => db.query(queries.todayRevenue, (e, r) => e ? rej(e) : res(r[0]))),
      new Promise((res, rej) => db.query(queries.mostItem, (e, r) => e ? rej(e) : res(r[0] || {}))),
    ])
      .then(([totalOrders, completed, pending, todayOrders, todayRevenue, mostItem]) => {
        resolve({
          totalOrders: totalOrders.total,
          completed: completed.total,
          pending: pending.total,
          todayOrders: todayOrders.total,
          todayRevenue: todayRevenue.total,
          mostItem: mostItem.item_name || "N/A",
        });
      })
      .catch(reject);
  });
}

function getRecentOrders() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT order_no, total_amount, order_status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5
    `;

    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}


function getOrderStats() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT DATE(created_at) as date,
             COUNT(*) as orders,
             SUM(total_amount) as revenue
      FROM orders
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getRecentOrders,
  getOrderStats,
};