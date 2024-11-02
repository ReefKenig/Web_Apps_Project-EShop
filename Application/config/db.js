const mongoose = require("mongoose");

const connect = async function (uri) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
