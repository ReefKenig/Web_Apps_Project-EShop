const express = require("express");
const router = express.Router();
const carController = require("../controllers/car");
const isAdmin=require("../middleware/authentication_admin");

router.post("/", carController.createCar);
router.get("/",isAdmin,carController.getAllCars);
router.get("/:id",isAdmin,carController.getCarById);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
