const Car = require("../models/car");

// Add a new car
exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({}, "-__v");

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id, "-__v");

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update car entry
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedCar) {
      res.status(200).json(updatedCar);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (deletedCar) {
      res.status(200).json({ message: "Car deleted successfully" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
