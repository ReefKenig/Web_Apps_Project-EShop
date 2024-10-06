const mongoose = require("mongoose");

const carImageSchema = new mongoose.Schema(
  {
    imageId: {
      type: Number,
      required: true,
      unique: true,
    },
    carId: {
      type: Number,
      ref: "Cars",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("images", carImageSchema);
module.exports = Image;
