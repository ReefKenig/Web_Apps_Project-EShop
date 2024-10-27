const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  orderHistory: [
    {
      orderId: {
        type: Number,
        required: true,
        unique:true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      items: [
        {
          carId: {
            type: Number,
            required: true,
          },
          brand: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
