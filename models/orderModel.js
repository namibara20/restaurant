const db = require('./db');

class Order {
  static async create(user_id, total) {
    const [result] = await db.query(
      'INSERT INTO `Order` (user_id, total) VALUES (?, ?)',
      [user_id, total]
    );
    return result.insertId;
  }

  static async addOrderItems(order_id, items) {
    // items: [{ item_id, quantity }]
    const values = items.map(i => [order_id, i.item_id, i.quantity]);
    await db.query(
      'INSERT INTO OrderItem (order_id, item_id, quantity) VALUES ?',
      [values]
    );
  }

  static async getUserOrders(user_id) {
    const [rows] = await db.query(
      `SELECT o.order_id, o.total, o.status, o.timestamp, 
        JSON_ARRAYAGG(JSON_OBJECT('item_id', oi.item_id, 'quantity', oi.quantity)) as items
       FROM \`Order\` o
       JOIN OrderItem oi ON o.order_id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.order_id
       ORDER BY o.timestamp DESC`,
      [user_id]
    );
    return rows;
  }
}

module.exports = Order;
