const Manufacturer = require('../models/manufacturers');

// Create a new manufacturer
exports.createManufacturer = async (req, res) => {
  const { manufacturerId, manufacturerName } = req.body;

  const newManufacturer = new Manufacturer({
    manufacturerId:manufacturerId,
    manufacturerName:manufacturerName,
  });

  try {
    const savedManufacturer = await newManufacturer.save();
    res.status(201).json(savedManufacturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all manufacturers
exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    if (manufacturers.length === 0) {
      return res.status(404).json({ message: 'No manufacturers found' });
    }
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a manufacturer by ID
exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.manufacturerId);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a manufacturer by ID
exports.updateManufacturer = async (req, res) => {
  try {
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      req.params.manufacturerId,
      req.body,
      { new: true }
    );
    if (!updatedManufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(updatedManufacturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a manufacturer by ID
exports.deleteManufacturer = async (req, res) => {
    const{manufacturerId}=req.params;
      try {
await Manufacturer.deleteOne({manufacturerId:manufacturerId});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
