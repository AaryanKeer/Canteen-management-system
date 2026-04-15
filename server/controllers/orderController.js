const { getIO } = require("../config/socket");
const orderModel = require("../models/orderModel");


async function createOrder(req, res) {
  try {
    const { cart, total_amount, user_id } = req.body;

    const result = await orderModel.createOrder(
      {
        created_by: user_id,
        total_amount,
      },
      cart
    );

    // 🔥 SOCKET EMIT HERE
    const io = getIO();
    io.emit("newOrder", {
      orderId: result.orderId,
      orderNo: result.orderNo,
    });

    res.json({
      message: "Order created",
      order: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}


async function getOrders(req, res) {
  try {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await orderModel.updateOrderStatus(id, status);

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getDashboard(req, res) {
  try {
    const stats = await orderModel.getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getRecentOrders(req, res) {
  try {
    const orders = await orderModel.getRecentOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getOrderStats(req, res) {
  try {
    const data = await orderModel.getOrderStats();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateStatus,
  getDashboard,
  getRecentOrders,
  getOrderStats,
};