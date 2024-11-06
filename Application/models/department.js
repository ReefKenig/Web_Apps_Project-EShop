const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, match: /^[A-Za-z0-9\s-]{3,10}$/ },
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+\d{10,14}$/,
  },
  openingHours: [
    {
      day: {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Firday",
          "Saturday",
        ],
        required: true,
      },
      open: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
      close: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
    },
  ],
});

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;
