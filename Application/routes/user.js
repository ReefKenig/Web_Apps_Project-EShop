const express = require('express');
const userController = require('../controllers/user'); 
const router = express.Router();

// Create a new user
router.post('/', userController.createUser);//works

// User login
router.post('/login', userController.userLogin); //works

// Get all users
router.get('/', userController.getAllUsers);//works

// Get a user by ID
router.get('/:id', userController.getUserById);//works

// Update a user by ID
router.put('/:id', userController.updateUser);//works

// Delete a user by ID
router.delete('/:id', userController.deleteUser);//works

// Add an order to a user's order history
router.post('/:id/order', userController.addOrder);

module.exports = router;

