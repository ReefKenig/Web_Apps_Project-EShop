const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carColorRoutes = require("./routes/carColors");
const carImageRoutes = require("./routes/carimagesroute");
const UserRoutes=require("./routes/UsersRoute");
const { db } = require("./models/carColors");

dotenv.config();
const app = express();

const uri = `mongodb+srv://rkenig:${encodeURIComponent(
  "&f9-&Hy!NvaKvQX"
)}@carseshop.uecqa.mongodb.net/CarsEShop`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    const collections = await db.listCollections();
  } catch (error) {
    console.log(error);
  }
}

connect();

app.use("/", carColorRoutes);
app.use("/", carImageRoutes);

app.use(express.json());//middleware for userroutes
app.use("/",UserRoutes);


app.listen(process.env.PORT || 3030, () => {
  console.log(`Server listening on port ${process.env.PORT || 3030}`);
});
