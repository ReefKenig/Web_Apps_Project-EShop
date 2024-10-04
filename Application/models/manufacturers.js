const mongoose = require("mongoose");

// Define the schema for Manufacturers
const manufacturerSchema = new mongoose.Schema({
  manufacturerId: {
    type: Number,
    required: true,
    unique: true, // Ensure that each manufacturer has a unique ID
  },
  manufacturerName: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Manufacturer = mongoose.model("manufacturers", manufacturerSchema);

module.exports = Manufacturer;
