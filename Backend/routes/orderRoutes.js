const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const { authenticateToken, authorizeAdmin, authorizeCustomer } = require('../middleware/auth');

// Place an order (authenticated user)
router.post('/', authenticateToken, authorizeCustomer, orderController.placeOrder);
// Get logged-in user's orders
router.get('/my', authenticateToken, authorizeCustomer, orderController.getUserOrders);
// Get all orders (admin)
router.get('/', authenticateToken, authorizeAdmin, orderController.getAllOrders);
// Update order status (admin)
router.put('/:id/status', authenticateToken, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;