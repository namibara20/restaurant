const Reservation = require('../models/reservationModel');

exports.createReservation = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { date, number, timeslot } = req.body;
    const reservationId = await Reservation.create({ user_id, date, number, timeslot });
    res.status(201).json({ success: true, reservationId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const reservations = await Reservation.getUserReservations(user_id);
    res.json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
