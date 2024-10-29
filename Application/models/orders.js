const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      carId: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentInfo: {
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'PayPal', 'Bank Transfer'], 
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true },
);

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;