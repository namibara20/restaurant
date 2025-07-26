const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, orderController.placeOrder);
router.get('/', authenticateToken, orderController.getOrderHistory);

module.exports = router;
