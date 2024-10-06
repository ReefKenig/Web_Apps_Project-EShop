const Image = require("../models/images");

// Add new car image
exports.addImage = async (req, res) => {
  const { imageId, carId, imageUrl, description } = req.body;
  const newImage = new Image({
    imageId,
    carId,
    imageUrl,
    description,
  });

  try {
    const savedImage = await newImage.save(); // Save the new car image
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getImageById = async (req, res) => {
  const { imageid } = req.params;
  try {
    const image = await Image.findOne({ imageId: imageid });
    if (!image) {
      res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an image
exports.updateImage = async (req, res) => {
  const { imageId } = req.params; // Changed from req.params.id to req.params.carId
  try {
    const updatedCarImage = await Image.findOneAndUpdate(
      { imageId: imageId }, // Use CarId for finding
      req.body,
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedCarImage) {
      return res.status(404).json({ message: "Image not found." });
    }

    res.status(200).json(updatedCarImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  const { imageid } = req.params; // Extract carId from params
  try {
    const deletedImage = await Image.findOneAndDelete({ imageId: imageid });

    if (!deletedImage) {
      return res
        .status(404)
        .json({ message: `Image with ID ${carId} not found.` });
    }

    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
