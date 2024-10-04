const CarImage = require('../models/carImages'); 

// Add new car image
exports.addCarImage = async (req, res) => {
    const { CarId, CarName, ImageUrl, CarDescription } = req.body;
    const newCarImage = new CarImage({ CarId:carId, CarName:CarName, ImageUrl:ImageUrl, CarDescription:CarDescription });

    try {
        const savedCarImage = await newCarImage.save(); // Save the new car image
        res.status(201).json(savedCarImage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all images for a specific car
exports.getCarImages = async (req, res) => {
    try {
        const carImages = await CarImage.find({ CarId: req.params.carId }); 
        if (carImages.length === 0) {
            return res.status(404).json({ message: "No images found for this car." });
        }
        res.status(200).json(carImages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an image
exports.updateCarImage = async (req, res) => {
    const { carId } = req.params; // Changed from req.params.id to req.params.carId
    try {
        const updatedCarImage = await CarImage.findOneAndUpdate(
            { CarId: carId }, // Use CarId for finding
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
exports.deleteCarImage = async (req, res) => {
    const { carId } = req.params; // Extract carId from params
    try {
        const deletedCarImage = await CarImage.findOneAndDelete({ CarId: carId });

        if (!deletedCarImage) {
            return res.status(404).json({ message: `CarImage with CarId ${carId} not found.` });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
