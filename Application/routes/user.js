const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Create a new user
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
