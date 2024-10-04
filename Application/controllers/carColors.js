const CarColors = require("../models/carColors");

// Create a new color
exports.createCarColor = async (req, res) => {
  const { colorId, colorName, colorCode } = req.body;
  const newColor = new CarColors({ colorId:colorId, colorName:colorName, colorCode:colorCode }); 

  try {
    const savedColor = await newColor.save();
    res.status(201).json(savedColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all colors
exports.getAllCarColors = async (req, res) => {
  try {
    const colors = await CarColors.find({});
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update color
exports.updateCarColor = async (req, res) => {
  const { colorId } = req.params;
  const { colorName, colorCode } = req.body;

  try {
    const updatedColor = await CarColors.findOneAndUpdate(
      { colorId },
      { colorName, colorCode },
      { new: true }
    );
    if (!updatedColor) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.json(updatedColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete color
exports.deleteCarColor = async (req, res) => {
  const { colorId } = req.params;

  try {
    const deletedColor = await CarColors.deleteOne({ colorId });
    if (deletedColor.deletedCount === 0) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.json({ message: `Color with colorId ${colorId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
