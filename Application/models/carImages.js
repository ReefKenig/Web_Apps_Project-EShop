const mongoose = require("mongoose");

const carImageSchema = new mongoose.Schema({
  imageId: {
    type: Number,
    required: true,
    unique: true,
  },
  carId: {
    type: Number,
    ref: "cars",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const CarImage = mongoose.model("car_images", carImageSchema);

module.exports = CarImage;