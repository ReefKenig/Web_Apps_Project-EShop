// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connect = require("./config/db");

// Routers
const carRoutes = require("./routes/car");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/car", carRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

connect(uri);

//middleware
app.use(express.json()); 

app.use("/api/user",userRoutes);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
