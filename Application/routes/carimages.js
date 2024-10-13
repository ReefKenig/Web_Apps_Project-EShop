const express = require("express");
const router = express.Router();
const carImageController = require("../controllers/carImages");

// Create a new image
router.post("/", carImageController.createImage);

// Get all images
router.get("/", carImageController.getAllImages);

// Get an image by ID
router.get("/:id", carImageController.getImageById);

// Update an image
router.put("/:id", carImageController.updateImage);

// Delete an image
router.delete("/:id", carImageController.deleteImage);

module.exports = router;
