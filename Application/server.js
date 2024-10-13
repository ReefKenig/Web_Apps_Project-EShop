const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carColorRoutes = require("./routes/carColors");
const carImageRoutes = require("./routes/carImages");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/color", carColorRoutes);
app.use("/image", carImageRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

// Start server
app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
