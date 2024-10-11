const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carColorRoutes = require("./routes/carColors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/color", carColorRoutes);

// MongoDB connection
const uri = `mongodb+srv://rkenig:${encodeURIComponent(
  "&f9-&Hy!NvaKvQX"
)}@carseshop.uecqa.mongodb.net/CarsEShop`;

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
