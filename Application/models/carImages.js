// const mongoose = require('mongoose');

// const carImageSchema = new mongoose.Schema({
//     CarId: {
//         type: Number,
//         ref: 'cars',  // Assuming you have a Car model that this relates to
//         required: true,
//         unique:true,
//     },
//     CarName:{
//     type:String,
//     required:true
//     },
//     ImageUrl: {
//         type: String,
//         required: true
//     },
//     CarDescription: {
//         type: String,
//         required:true,
//     }
// }, { timestamps: true });
// carImageSchema.set('toJSON', {
//     transform: (doc, ret) => {
//       delete ret.__v; // Remove the __v field
//       return ret; // Return the modified object
//     },
//   })
// const CarImages=mongoose.model("car_images", carImageSchema);
// module.exports = CarImages;