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
      return value.slice(-4); // Return the last four digits for storage/display
    },
    get() {
      // Return the masked version when accessed
      return '************' + this.fullCardNumber.slice(-4); // Mask all but the last four digits
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
    type: Number,
    required: true,  // Reference to the user making the payment
    ref: 'users',
  },
  expiryDate: {
    type: String,
    required: true,
  },
  status:{
    type:Boolean,
   required:true,
  }
});

// Create a model from the schema
const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;
