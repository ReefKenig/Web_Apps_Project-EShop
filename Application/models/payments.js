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
    // A custom setter to store only the last four digits for display purposes
    set: (value) => {
      // Store the full card number
      this.fullCardNumber = value;
      // Return the last four digits for display
      return value.slice(-4);
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
