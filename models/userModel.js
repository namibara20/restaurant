const db = require('./db');

class User {
  static async create(userData) {
    const [result] = await db.query(
      'INSERT INTO User SET ?',
      userData
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM User WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}

module.exports = User;
