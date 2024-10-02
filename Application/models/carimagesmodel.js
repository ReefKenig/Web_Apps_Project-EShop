const mongoose = require('mongoose');

const carImageSchema = new mongoose.Schema({
    CarId: {
        type: Number,
        ref: 'Car',  // Assuming you have a Car model that this relates to
        required: true,
        unique:true,
    },
    CarName:{
    type:String,
    required:true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    CarDescription: {
        type: String,
        required:true,
    }
}, { timestamps: true });

const CarImages=mongoose.model("car_images", carImageSchema);
module.exports = CarImages;
