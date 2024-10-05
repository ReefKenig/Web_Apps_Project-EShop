const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carColorRoutes=require("./routes/carColors");
const paymentRoutes=require("./routes/payments");
const userRoutes=require("./routes/users");
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

app.use("/",carColorRoutes);
app.use("/",userRoutes);
app.use("/",paymentRoutes);


app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
