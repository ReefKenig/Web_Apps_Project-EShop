const Car = require("../models/cars");
const { createCarFilters } = require("../helpers/filters");

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const filters = createCarFilters(req.query);

    const cars = await Car.find(filters, "-__v");

    res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch cars", error: error.message });
  }
};

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


// Function to get car data for chart
exports.getCarDataForChart = async (req, res) => {
  try {
    const data = await Car.aggregate([
      {
        $group: {
          _id: "$manufacturer",  // Group by manufacturer
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

    res.json(data);  // Return the aggregated data in JSON format
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
