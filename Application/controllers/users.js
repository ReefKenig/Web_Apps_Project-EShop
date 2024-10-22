const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const THIRTY_DAYS = 60 * 1000 * 24 * 60 * 30;

// Create a new user
exports.register = async (req, res) => {
  const { userId, firstName, lastName, email, password, isAdmin } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    userId,
    firstName,
    lastName,
    email,
    password: hashPassword,
    isAdmin,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(404).json({ msg: "User already exists", error: err });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const userId = user.userId;
    const accessToken = jwt.sign(
      { userId, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: THIRTY_DAYS,
    });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "User not found" });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(req.params.userid);
    console.log("user are:", users);
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log("error message");
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userid, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { userid } = req.params;
  try {
    await User.deleteOne({ userId: userid });
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
