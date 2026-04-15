const menuModel = require("../models/menuModel");

async function getMenu(req, res) {
  const items = await menuModel.getAllMenuItems();
  res.json(items);
}

async function addMenu(req, res) {
  const { item_name, category, type, price, image_url } = req.body;

  await menuModel.addMenuItem({
    item_name,
    category,
    type,
    price,
    image_url,
  });

  res.json({ message: "Menu item added" });
}

async function toggleAvailability(req, res) {
  const { id } = req.params;
  const { available } = req.body;

  await menuModel.updateAvailability(id, available);
  res.json({ message: "Updated" });
}

module.exports = {
  getMenu,
  addMenu,
  toggleAvailability,
};