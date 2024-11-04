const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  orderHistory: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "orders" },
    },
  ],
  shoppingCart: [
    {
      carId: {
        type: Schema.Types.ObjectId,
        ref: "cars",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      addedeAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, required: true },
    },
  ],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
