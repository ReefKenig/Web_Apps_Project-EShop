const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Create a new user
router.post("/", userController.register);

// User login
router.post("/login", userController.login);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:userid", userController.getUserById);

// Update a user
router.put("/users/:userid", userController.updateUser);

// Delete a user
router.delete("/users/:userid", userController.deleteUser);

module.exports = router;
