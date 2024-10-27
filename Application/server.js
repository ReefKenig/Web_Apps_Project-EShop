const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const carColorRoutes = require("./routes/carColors");
// const carRoutes=require("./routes/cars");
// const ManufacturersRoutes=require("./routes/manufacturers");
// const PaymentsRoutes=require("./routes/payments");
// const CarImagesRoutes=require("./routes/carimages");
const userRoutes=require("./routes/user")
// const { db } = require("./models");

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

// app.use("/api/carColor", carColorRoutes);
// app.use("/api/car",carRoutes);
// app.use("/manufacturs",ManufacturersRoutes);
// app.use("/",PaymentsRoutes);
// app.use("/",CarImagesRoutes);
app.use("/api/user",userRoutes);

app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
