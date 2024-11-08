// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./config/db");
const cors=require('cors');
// Routers
const carRoutes = require("./routes/car");
const userRoutes = require("./routes/user");
const departmentRoutes = require("./routes/department");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

connect(uri);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
