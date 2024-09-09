const mongoose = require("mongoose");

const carColorSchema = new mongoose.Schema({
  colorId: {
    type: Number,
    required: true,
    unique: true,
  },
  colorName: {
    type: Number,
    required: true,
  },
  colorCode: {
    type: Number,
    required: true,
    match: /^#[0-9A-F]{6}$/i, // Hex code validity
  },
});

const CarColor = mongoose.model("CarColor", carColorSchema);

module.exports = CarColor;
