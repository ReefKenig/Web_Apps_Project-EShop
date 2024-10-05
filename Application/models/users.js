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

// Encrypt password before saving
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("users", userSchema);

module.exports = User;
