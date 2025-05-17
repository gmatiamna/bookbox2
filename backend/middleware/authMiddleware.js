const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const JWT_SECRET = "abc123"; // Ideally, keep this in an environment variable

  // Check if token is in Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]; // Get token from Authorization header
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; // Get token from cookies if available
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user to request object
      req.user = await User.findById(decoded.userId).select('-mot_de_passe');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, isAdmin };
