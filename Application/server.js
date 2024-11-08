// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./config/db");
const cors = require("cors");

// Routers
const carRoutes = require("./routes/cars");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");  // Corrected path here
const departmentRoutes = require("./routes/departments");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = process.env.MONGODB_URI;
connect(uri);

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/departments", departmentRoutes);

// Serve static files from client directory
app.use(express.static(path.join(__dirname, "client")));

// Default route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
