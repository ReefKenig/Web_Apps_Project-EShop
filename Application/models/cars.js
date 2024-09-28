const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carId: {
    type: Number,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: Number,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  gear: {
    type: String,
    required: true,
  },
  color: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Number,
  },
  video: {
    type: Number,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
