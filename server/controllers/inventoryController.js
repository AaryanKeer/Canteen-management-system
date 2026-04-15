const inventoryModel = require("../models/inventoryModel");
const { getIO } = require("../config/socket");

// GET ALL
async function getInventory(req, res) {
  const data = await inventoryModel.getInventory();
  res.json(data);
}

// ADD ITEM
async function addInventory(req, res) {
  await inventoryModel.addInventory(req.body);

  // 🔥 EMIT SOCKET
  const io = getIO();
  io.emit("inventoryUpdated");

  res.json({ message: "Item added" });
}

// UPDATE ITEM
async function updateInventory(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  await inventoryModel.updateInventory(id, quantity);

  // 🔥 EMIT SOCKET
  const io = getIO();
  io.emit("inventoryUpdated");

  res.json({ message: "Updated" });
}

// LOW STOCK
async function getLowStock(req, res) {
  const data = await inventoryModel.getLowStock();
  res.json(data);
}

// DELETE ITEM
async function deleteInventory(req, res) {
  const { id } = req.params;

  await inventoryModel.deleteInventory(id);

  // 🔥 EMIT SOCKET
  const io = getIO();
  io.emit("inventoryUpdated");

  res.json({ message: "Deleted successfully" });
}

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  getLowStock,
  deleteInventory
};