const express = require('express');
const userController = require('../controllers/user'); // Adjust path as necessary
const router = express.Router();

// Create a new user
router.post('/user', userController.createUser);

// Get all users
router.get('/user', userController.getAllUsers);

// Get a user by ID
router.get('/user/:id', userController.getUserById);

// Update a user by ID
router.put('/user/:id', userController.updateUser);

// Delete a user by ID
router.delete('/user/:id', userController.deleteUser);

// Add an order to a user's order history
router.post('/user/:id/order', userController.addOrder);

module.exports = router;
