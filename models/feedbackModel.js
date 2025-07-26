const db = require('./db');

class Feedback {
  static async create({ name, email, message }) {
    const [result] = await db.query(
      'INSERT INTO Feedback (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Feedback');
    return rows;
  }
}

module.exports = Feedback;
