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
app.use(express.static("public"));
app.use('/views', express.static('views'));

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

app.get("/api/header", (req, res) => {
  const headerPath = path.join(__dirname, "public/header.html");

  // Read the header HTML file and send its content as the response
  fs.readFile(headerPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading header file:", err);
      return res.status(500).send("Error loading header");
    }
    res.send(data);
  });
});
