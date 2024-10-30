const express = require("express");
const router = express.Router();
const carColorController = require("../controllers/carColors");

// Create a new color
router.post("/", carColorController.createColor);

// Get all colors
router.get("/", carColorController.getAllColors);

// Get a color by ID
router.get("/colors/:id", carColorController.getColorById);

// Update a color
router.put("/:id", carColorController.updateColor);

// Delete a color
router.delete("/:id", carColorController.deleteColor);

module.exports = router;
