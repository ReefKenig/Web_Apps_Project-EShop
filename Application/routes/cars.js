const express = require("express");
const router = express.Router();
const carController = require("../controllers/cars");

router.post("/", carController.createCar);
router.get("/:chartnumbers",carController.)
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
