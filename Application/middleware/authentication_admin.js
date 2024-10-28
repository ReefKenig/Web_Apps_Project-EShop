// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user.permissions !== true) {  // Assuming 'true' is for admins
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = admin;