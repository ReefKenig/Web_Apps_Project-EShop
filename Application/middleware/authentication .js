const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
