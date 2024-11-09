const User = require("../models/users");
const Car = require("../models/cars");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUserFilters } = require("../helpers/filters");

const THIRTY_DAYS = 60 * 1000 * 24 * 60 * 30;

// Register new user
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      orderHistory,
      shoppingCart,
    } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password and create a new user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin,
      orderHistory,
      shoppingCart,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ msg: "Error occurred", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

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
  } catch (error) {
    res.status(400).json({ msg: "Error occurred", error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const filters = createUserFilters(req.query, "users");

    const users = await User.find(filters, "-__v")
      .populate({
        path: "orderHistory",
        populate: { path: "items.carId", model: Car },
      })
      .populate({
        path: "shoppingCart.carId",
        model: Car,
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-__v")
      .populate({
        path: "orderHistory",
        populate: { path: "items.carId", model: Car },
      })
      .populate({
        path: "shoppingCart.carId",
        model: Car,
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
