const db = require('./db');

class Reservation {
  static async create({ user_id, date, number, timeslot }) {
    const [result] = await db.query(
      'INSERT INTO TableReservation (user_id, date, number, timeslot) VALUES (?, ?, ?, ?)',
      [user_id, date, number, timeslot]
    );
    return result.insertId;
  }

  static async getUserReservations(user_id) {
    const [rows] = await db.query(
      'SELECT * FROM TableReservation WHERE user_id = ? ORDER BY date DESC',
      [user_id]
    );
    return rows;
  }
}

module.exports = Reservation;
