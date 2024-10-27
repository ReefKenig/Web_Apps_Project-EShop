const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), 
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      items: [
        {
          carId: {
            type: mongoose.Types.ObjectId,
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
  shoppingCart: [
    {
      carId: {
        type: mongoose.Types.ObjectId,
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
});

const User = mongoose.model('user', userSchema);

module.exports = User;
