const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getMenu);
router.post("/", menuController.addMenu);
router.patch("/:id/status", menuController.toggleAvailability);

module.exports = router;