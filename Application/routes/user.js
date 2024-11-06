const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const isAdmin = require("../middleware/authentication_admin");
const auth = require("../middleware/authentication");

// Create a new user
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

// Get all users
router.get("/", isAdmin, userController.getAllUsers);

// Get a user by ID
router.get("/:id", auth, userController.getUserById);

// Update a user by ID
router.put("/:id", auth, userController.updateUser);

// Delete a user by ID
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
