const mongoose = require('mongoose');
// Define the schema for Payments
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
    required: true,
    unique: true,
  },
  cardNumber: {
    type: String,
    required: true,
    set(value) {
      // Store the full card number
      this.fullCardNumber = value; // Store the full number
      return "************"+value.slice(-4); // Return the last four digits for storage/display
    },
  },
  paymentMethod: {
    type: String, 
    required: true,
  },
  creditType:{
    type:String,
    required:true,
  },
  u_id: {
    type:mongoose.Schema.Types.ObjectId ,
    required: true,  // Reference to the user making the payment
    ref:"user"
  },
  expiryDate: {
    type: String,
    required: true,
  },
  status:{
    type:Boolean,
   required:true,
   default:false,
  }
});
paymentSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v; // Remove the __v field
    return ret; // Return the modified object
  },
})
// Create a model from the schema
const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;
