const express = require("express");
const router = express.Router();
const carController = require("../controllers/cars");

// Create a new car
router.post("/", carController.createCar);

// In your routes file
router.post("/filter", carController.filterCars);

// Get cars
router.get("/search", carController.getCars);

// Get cars by ID
router.get("/search/:id", carController.getCarById);

// Update car
router.put("/:id", carController.updateCar);

// Delete car
router.delete("/:id", carController.deleteCar);

router.get("/chart-data",carController.getCarDataForChart);

module.exports = router;
