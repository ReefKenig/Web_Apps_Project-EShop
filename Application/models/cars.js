// const mongoose = require('mongoose');

// // Define the schema for Cars
// const carSchema = new mongoose.Schema({
//   carId: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   carName: {
//     type: String,
//     required: true,
//   },
//   manufacturer: {
//     type: String,
//     required: true,
//     ref: 'car_manufacturers',  // Reference to another collection for manufacturers if needed
//   },
//   year: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   color: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'car_colors',  // Reference to Car Colors collection
//     required: true,
//   },
//   engine: {
//     type: String,
//     required: true,
//   },
//   kilometers: {
//     type: Number,
//     required: true,
//   },
//   chalk: {
//     type: String,
//     required: true,  // You can change the type and requirement based on your use case
//   },
//   images: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'car_images',  // Reference to Car Images collection
//   }],
//   whichHand: {
//     type: Number,
//     required: true,
//   },
//   approved: {
//     type: Boolean,
//     default: false,  // Default to false, meaning not approved unless specified
//   }
// });
// carSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     delete ret.__v; // Remove the __v field
//     return ret; // Return the modified object
//   },
// })
// // Create a model from the schema
// const Car = mongoose.model('cars', carSchema);

// module.exports = Car;
