// Cars Online Shop
// Reef Kenig 314920851
// Liron Daniel
// Yuval Pardo
// David Tsitsiyashvili
// Roni

// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./config/db");
const cors = require("cors");

// Routers
const carRoutes = require("./routes/cars");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const departmentRoutes = require("./routes/departments");

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/departments", departmentRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

connect(uri);

app.use(express.static(path.join(__dirname, "client")));

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
