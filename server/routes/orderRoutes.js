const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.patch("/:id/status", orderController.updateStatus);
router.get("/dashboard", orderController.getDashboard);
router.get("/recent", orderController.getRecentOrders);
router.get("/stats", orderController.getOrderStats);

module.exports = router;