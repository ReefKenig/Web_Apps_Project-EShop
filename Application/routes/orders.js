// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders (Admin view)
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:orderId', orderController.getOrderById);

// Get orders by user ID
router.get('/user/:userId', orderController.getOrdersByUserId);

// Update order details
router.put('/:orderId', orderController.updateOrder);

// Delete an order
router.delete('/:orderId', orderController.deleteOrder);

// Update order status
router.patch('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
