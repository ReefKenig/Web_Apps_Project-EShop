const express = require("express");
const router = express.Router();
const carColorController = require("../controllers/carColorController");

// Create a new color
router.post("/", carColorController.createCarColor);

// Get all colors
router.get("/", carColorController.getAllCarColors);

// Get a color by ID
router.get("/:colorId", carColorController.getColorById);

// Update a color
router.put("/:colorId", carColorController.updateCarColor);

// Delete a color
router.delete("/:colorId", carColorController.deleteCarColor);

module.exports = router;
