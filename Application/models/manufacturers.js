const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
  manufacturerId: {
    type: Number,
    required: true,
    unique: true,
  },
  manufacturerName: {
    type: String,
    required: true,
  },
});

const Manufacturer = mongoose.model("manufacturers", manufacturerSchema);

module.exports = Manufacturer;
