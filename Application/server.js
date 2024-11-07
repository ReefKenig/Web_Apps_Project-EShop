const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carRoutes = require("./routes/cars");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

dotenv.config();
const app = express();
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

//middleware
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
