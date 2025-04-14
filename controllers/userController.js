const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { nom, email, d_ness, mot_de_passe, genre_prefere } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HttpError("User already exists", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

  // Create the new user
  const newUser = await User.create({
    nom,
    email,
    d_ness,
    mot_de_passe: hashedPassword,
    genre_prefere,
  });

  // Send success response
  res.status(201).json({
    message: "User signed up successfully",
    user: {
      id: newUser._id,
      nom: newUser.nom,
      email: newUser.email,
      d_ness: newUser.d_ness,
      genre_prefere: newUser.genre_prefere,
      role: newUser.role
    }
  });
});

// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, mot_de_passe } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(mot_de_passe, user.mot_de_passe))) {
    return next(new HttpError("Invalid credentials", 401));
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  // Set JWT as an HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side access to the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
  });

  // Send success response with user data
  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      nom: user.nom,
      email: user.email,
      d_ness: user.d_ness,
      genre_prefere: user.genre_prefere,
      role: user.role
    }
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-mot_de_passe');
  if (!user) {
    return next(new HttpError("User not found", 404));
  }
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
