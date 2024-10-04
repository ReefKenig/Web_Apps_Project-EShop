const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturer');

// Create a new manufacturer
router.post('/manufacturers', manufacturerController.createManufacturer);

// Get all manufacturers
router.get('/manufacturers', manufacturerController.getAllManufacturers);

// Get a manufacturer by ID
router.get('/manufacturers/:manufacturerId', manufacturerController.getManufacturerById);

// Update a manufacturer by ID
router.put('/manufacturers/:manufacturerId', manufacturerController.updateManufacturer);

// Delete a manufacturer by ID
router.delete('/manufacturers/:manufacturerId', manufacturerController.deleteManufacturer);

module.exports = router;
