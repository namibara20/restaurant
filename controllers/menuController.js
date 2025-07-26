const MenuItem = require('../models/menuModel');

exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.getAll();
    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const itemId = await MenuItem.create(req.body);
    res.status(201).json({ success: true, itemId });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
