const Order = require('../models/orderModel');
const db = require('../models/db');

exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }

    // Calculate total
    const itemIds = items.map(i => i.item_id);
    const [menuItems] = await db.query(
      `SELECT item_id, price FROM MenuItem WHERE item_id IN (${itemIds.map(() => '?').join(',')})`,
      itemIds
    );

    let total = 0;
    let priceMap = {};
    menuItems.forEach(mi => priceMap[mi.item_id] = mi.price);
    items.forEach(i => {
      total += (priceMap[i.item_id] || 0) * i.quantity;
    });

    // Create order and order items
    const orderId = await Order.create(user_id, total);
    await Order.addOrderItems(orderId, items);

    res.json({ success: true, orderId, total });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const orders = await Order.getUserOrders(user_id);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
