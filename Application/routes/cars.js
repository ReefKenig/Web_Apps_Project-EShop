const express = require('express');
const router = express.Router();
const carController = require('../controllers/cars');

// Create a new car
router.post('/cars', carController.createCar);

// Get all cars
router.get('/cars', carController.getAllCars);

// Get a car by carId
router.get('/cars/:carId', carController.getCarByCarId);

// Update a car by carId
router.put('/cars/:carId', carController.updateCar);

// Delete a car by carId
router.delete('/cars/:carId', carController.deleteCar);

module.exports = router;
