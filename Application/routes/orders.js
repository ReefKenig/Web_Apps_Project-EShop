// routes/orderRoutes.js
const express = require("express");
const orderController = require("../controllers/orders");
const router = express.Router();

// Create a new order
router.post("/", orderController.createOrder);

router.get("/search", orderController.getOrders);

// Get order by ID
router.get("/:id", orderController.getOrderById);

// Update order details
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

router.get('/user/:id', orderController.getOrdersByUserId);

module.exports = router;
