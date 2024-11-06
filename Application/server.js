// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./config/db");

// Routers
const carRoutes = require("./routes/car");
const userRoutes = require("./routes/user");
const departmentRoutes = require("./routes/department");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/info", departmentRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

connect(uri);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
