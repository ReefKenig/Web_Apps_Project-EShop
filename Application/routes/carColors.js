const express = require("express");
const router = express.Router();
const carColorController = require("../controllers/carColors");

router.post("/", carColorController.createCarColor);
router.get("/", carColorController.getAllCarColors);
router.put("/:colorId", carColorController.updateCarColor);
router.delete("/:colorId", carColorController.deleteCarColor);

module.exports = router;
