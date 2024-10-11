const CarColor = require("../models/carColors");

// Create a new color
exports.createColor = async (req, res) => {
  try {
    const { colorId, colorName, colorCode } = req.body;
    const newColor = new CarColor({ colorId, colorName, colorCode });
    await newColor.save();
    res
      .status(201)
      .json({ message: "Color created successfully", data: newColor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all colors
exports.getAllColors = async (req, res) => {
  try {
    const colors = await CarColor.find({});
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a color by ID
exports.getColorById = async (req, res) => {
  try {
    const color = await CarColor.findOne({ colorId: req.params.colorId });

    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update color
exports.updateColor = async (req, res) => {
  try {
    const { colorName, colorCode } = req.body;
    const updatedColor = await CarColor.findOneAndUpdate(
      { colorId: req.params.colorId },
      { colorName, colorCode },
      { new: true, runValidators: true }
    );

    if (!updatedColor) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.status(200).json({ message: "Color updated", data: updatedColor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete color
exports.deleteColor = async (req, res) => {
  try {
    const deletedColor = await CarColor.findOneAndDelete({
      colorId: req.params.colorId,
    });

    if (!deletedColor) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.status(200).json({ message: "Color deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
