const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Create a new user
router.post("/users", userController.register);

// User login
router.post("/users/login", userController.login);

// Get all users
router.get("/users", userController.getAllUsers);

// Get a user by ID
router.get("/users/:userid", userController.getUserById);

// Update a user
router.put("/users/:userid", userController.updateUser);

// Delete a user
router.delete("/users/:userid", userController.deleteUser);

module.exports = router;
