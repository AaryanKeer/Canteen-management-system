const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryController");

router.get("/", controller.getInventory);
router.post("/", controller.addInventory);
router.patch("/:id", controller.updateInventory);
router.get("/low", controller.getLowStock);
router.delete("/:id", controller.deleteInventory);

module.exports = router;