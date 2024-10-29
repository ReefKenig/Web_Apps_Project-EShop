const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
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
  orderHistory: 
  [
    {
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      items: [
        {
          carId: {
            type: Schema.Types.ObjectId,
            ref: "Car",
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
},
);


const User = mongoose.model('users', userSchema);

module.exports = User;
