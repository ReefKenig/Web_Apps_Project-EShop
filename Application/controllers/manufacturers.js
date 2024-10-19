const Manufacturer = require("../models/manufacturers");

// Create a new manufacturer
exports.createManufacturer = async (req, res) => {
  try {
    const { manufacturerId, manufacturerName } = req.body;
    const newManufacturer = new Manufacturer({
      manufacturerId,
      manufacturerName,
    });
    await newManufacturer.save();
    res.status(201).json({
      message: "Manufacturer created successfully",
      data: newManufacturer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all manufacturers
exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({});
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a manufacturer by ID
exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findOne({
      manufacturerId: req.params.id,
    });
    if (!manufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a manufacturer by ID
exports.updateManufacturer = async (req, res) => {
  try {
    const { manufacturerName } = req.body;
    const updatedManufacturer = await Manufacturer.findOneAndUpdate(
      { manufacturerId: req.params.id },
      { manufacturerName },
      { new: true, runValidators: true }
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }
    res
      .status(200)
      .json({ message: "Manufacturer updated", data: updatedManufacturer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a manufacturer by ID
exports.deleteManufacturer = async (req, res) => {
  try {
    const deletedManufacturer = await Manufacturer.findOneAndDelete({
      manufacturerId: req.params.id,
    });
    if (!deletedManufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }

    res.status(200).json({ message: "Manufacturer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
