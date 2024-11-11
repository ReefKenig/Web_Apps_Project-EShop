const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

// Create a new user
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

// Add item to cart
router.post("/add-to-cart", userController.addToCart);

// Remove item from cart
router.post("/remove-from-cart", userController.removeFromCart);

// Get users
router.get("/search", userController.getUsers);

// Get a user by ID
router.get("/search/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
