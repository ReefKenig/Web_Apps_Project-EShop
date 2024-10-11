const CarImage = require("../models/carimages");

// Create a new image
exports.createImage = async (req, res) => {
  try {
    const { imageId, carId, url, description } = req.body;
    const newImage = new CarImage({ imageId, carId, url, description });
    await newImage.save();
    res
      .status(201)
      .json({ message: "Image created successfuly", data: newImage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await CarImage.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await CarImage.findOne({ imageId: req.params.id });

    if (!image) return res.status(404).json({ message: "Image not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an image
exports.updateImage = async (req, res) => {
  try {
    const { url, description } = req.body;
    const updatedImage = await CarImage.findOneAndUpdate(
      { imageId: req.params.id },
      { url, description },
      { new: true, runValidators: true }
    );

    if (!updatedImage)
      return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ message: "Image updated", data: updatedImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const deletedImage = await CarImage.findOneAndDelete({
      imageId: req.params.id,
    });

    if (!deletedImage)
      return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
