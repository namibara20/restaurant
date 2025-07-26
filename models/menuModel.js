const db = require('./db');

class MenuItem {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM MenuItem');
    return rows;
  }

  static async create(itemData) {
    const [result] = await db.query(
      'INSERT INTO MenuItem SET ?',
      itemData
    );
    return result.insertId;
  }
}

module.exports = MenuItem;
