// const mongoose = require("mongoose");

// // Define the schema for Manufacturers
// const manufacturerSchema = new mongoose.Schema({
//   manufacturerId: {
//     type: Number,
//     required: true,
//     unique: true, // Ensure that each manufacturer has a unique ID
//   },
//   manufacturerName: {
//     type: String,
//     required: true,
//   },
// });
// manufacturerSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     delete ret.__v; // Remove the __v field
//     return ret; // Return the modified object
//   },
// })
// // Create a model from the schema
// const Manufacturer = mongoose.model("manufacturers", manufacturerSchema);

// module.exports = Manufacturer;
