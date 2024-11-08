const express = require("express");
const router = express.Router();
const carController = require("../controllers/cars");

router.post("/", carController.createCar);
router.get("/search", carController.getCars);
router.get("/search/:id", carController.getCarById);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
