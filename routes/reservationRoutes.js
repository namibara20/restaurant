const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, reservationController.createReservation);
router.get('/', authenticateToken, reservationController.getReservations);

module.exports = router;
