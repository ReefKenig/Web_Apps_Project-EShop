const Car = require('../models/cars');

// Create a new car
exports.createCar = async (req, res) => {
  const { carId, carName, manufacturer, year, price, color, engine, kilometers, chalk, images, whichHand, approved } = req.body;
  
  const newCar = new Car({
    carId:carId,
    carName:carName,
    manufacturer:manufacturer,
    year:year,
    price:price,
    color:color,
    engine:engine,
    kilometers:kilometers,
    chalk:chalk,
    images:images,
    whichHand:whichHand,
    approved:approved
  });

  try {
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ msg:"Car already saved",message: error.message });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find()
    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars found' });
    }
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a car by ID
exports.getCarByCarId= async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.carId,req.body, { new: true })
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
    const{carId}=req.params;
  try {
      await Car.deleteOne({carId:carId});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};