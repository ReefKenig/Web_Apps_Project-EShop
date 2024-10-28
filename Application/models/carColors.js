// const mongoose = require("mongoose");

// const carColorSchema = new mongoose.Schema(
//   {
//     colorId: {
//       type: Number,
//       required: true,
//       unique: true,
//     },
//     colorName: {
//       type: String,
//       required: true,
//     },
//     colorCode: {
//       type: String,
//       required: true,
//       match: /^#[0-9A-F]{6}$/i, // Hex code validity
//     },
//   },
// );
// carColorSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     delete ret.__v; // Remove the __v field
//     return ret; // Return the modified object
//   },
// })
// const CarColors = mongoose.model("car_colors", carColorSchema);

// module.exports = CarColors;


