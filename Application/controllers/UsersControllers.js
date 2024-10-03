const bcrypt=require('bcrypt');
const User = require('../models/UsersModel');

// Create a new user
const createUser = async (req, res) => {
    try {
        // Hash the password before saving the user
        const saltRounds = 10; // The cost factor controls how much time is needed to calculate a single hash
        const hashedPassword = await bcrypt.hash(req.body.encryptedPassword, saltRounds);

        const user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            encryptedPassword: hashedPassword, // Use hashed password
            permissions: req.body.permissions
        });
        
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(req.body.encryptedPassword, user.encryptedPassword);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, lastName: user.lastName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};