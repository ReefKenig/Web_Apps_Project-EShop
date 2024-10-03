const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');

// Create a new user
router.post('/Users', userController.createUser);

// Get all users
router.get('/Users', userController.getAllUsers);

// Get a user by ID
router.get('/Users/:userid', userController.getUserById);

// Update a user
router.put('/Users/:userid', userController.updateUser);

// Delete a user
router.delete('/Users/:userid', userController.deleteUser);

// User login
router.post('/Users/login', userController.loginUser);

module.exports = router;
