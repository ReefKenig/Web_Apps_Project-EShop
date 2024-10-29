// const User = require("../models/users");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const THIRTY_DAYS = 60 * 1000 * 24 * 60 * 30;

// // Create a new user
// exports.register = async (req, res) => {
//   const salt = await bcrypt.genSalt();
//   try {
//     const { userId, firstName, lastName, email, password, isAdmin } = req.body;
//     const hashPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({
//       userId,
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//       isAdmin,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(404).json({ msg: "User already exists", error: err });
//   }
// };

// // User login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) return res.status(400).json({ msg: "Wrong password" });

//     const userId = user.userId;
//     const accessToken = jwt.sign(
//       { userId, email },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "30d" }
//     );

//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       maxAge: THIRTY_DAYS,
//     });
//     res.json({ token: accessToken });
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ msg: "User not found" });
//   }
// };

// //get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(req.params.userid);
//     if (users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     console.log("error message");
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findOne({ userId: req.params.id });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a user
// exports.updateUser = async (req, res) => {
//   const salt = await bcrypt.genSalt();
//   try {
//     const { firstName, lastName, email, password, isAdmin } = req.body;
//     const hashPassword = await bcrypt.hash(password, salt);
//     const user = await User.findOneAndUpdate(
//       { userId: req.params.id },
//       { firstName, lastName, email, hashPassword, isAdmin },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a user
// exports.deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params.id;
//     await User.deleteOne({ userId: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(204).send({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
