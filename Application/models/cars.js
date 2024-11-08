const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    yearOfManufacture: {
      type: Number,
      required: true,
      max: new Date().getFullYear(),
    },
    unitsInStock: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    media: {
      pictures: {
        type: [String],
        validate: {
          validator: (v) =>
            v.every((url) =>
              /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i.test(url)
            ),
          message: "Invalid picture URL format",
        },
      },
      videos: {
        type: [String],
        validate: {
          validator: (v) =>
            v.every((url) => /^https?:\/\/.+\.(mp4|avi|mkv|mov)$/i.test(url)),
          message: "Invalid video URL format",
        },
      },
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("cars", carSchema);

module.exports = Car;
