const Car = require("../models/cars");

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({}, "-__v");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to get the count of cars per manufacturer
const getCarDataForChart = async (req, res) => {
  try {
    // Aggregate the data by manufacturer and sum the unitsInStock
    const data = await Car.aggregate([
      {
        $group: {
          _id: "$manufacturer",        // Group by manufacturer
          carCount: { $sum: "$unitsInStock" } // Sum the unitsInStock for each manufacturer
        }
      },
      {
        $project: {
          manufacturer: "$_id",  // Rename _id to manufacturer
          carCount: 1,           // Include carCount
          _id: 0                 // Exclude _id
        }
      }
    ]);

    // Return the aggregated data in JSON format
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCarDataForChart };


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
