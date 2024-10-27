const User = require('../models/user'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const THIRTY_DAYS = 60 * 1000 * 24 * 60 * 30;

// Create a new user or log in
exports.createUser = async (req, res) => {
    const { firstName, lastName, email, password, isAdmin, orderHistory, shoppingCart } = req.body;

    try {
        // Check if the user already exists for login
        let user = await User.findOne({ email });

        if (user) {
            // If the user exists, check the password for login
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ msg: "Wrong password" });
            
            // Generate a new token
            const accessToken = jwt.sign(
                { userId: user._id, email }, // Use the MongoDB ObjectId
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30d" }
            );
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: THIRTY_DAYS,
            });
            return res.json({ token: accessToken });
        } else {
            // If the user does not exist, create a new user
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            user = new User({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password: hashPassword,
                isAdmin:isAdmin,
                orderHistory:orderHistory,
                shoppingCart:shoppingCart,
            });
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(400).json({ msg: "Error occurred", error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Uses MongoDB ObjectId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update user information
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Uses MongoDB ObjectId
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add an order to user's orderHistory
exports.addOrder = async (req, res) => {
    try {
        const { order } = req.body; // Remove userId from the body
        const user = await User.findById(req.params.id); // Uses MongoDB ObjectId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the order to orderHistory
        user.orderHistory.push(order);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
