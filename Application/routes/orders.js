// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orders');
const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders (Admin view)
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Get orders by user ID
router.get('/user/:id', orderController.getOrdersByUserId);

// Update order details
router.put('/:id', orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
