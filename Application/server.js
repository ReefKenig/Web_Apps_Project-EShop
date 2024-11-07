// Imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./config/db");
const cors = require("cors");

// Routers
const carRoutes = require("./routes/cars");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI;

connect(uri);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});

// app.get('/api/header', (req, res) => {
//   const headerPath = path.join(__dirname, 'public/header.html');
  
//   // Read the header HTML file and send its content as the response
//   fs.readFile(headerPath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading header file:', err);
//       return res.status(500).send('Error loading header');
//     }
//     res.send(data);
//   });
// });
