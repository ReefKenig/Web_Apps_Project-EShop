const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default permissions value
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
