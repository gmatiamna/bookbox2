const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/generateToken");

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



  // Create the new user
  const newUser = await User.create({
    nom,
    email,
    d_ness,
    mot_de_passe,
    genre_prefere,
  });

  // Generate token 
  generateToken(res, newUser._id);

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
   const user = await User.findOne({ email }).select("+mot_de_passe");
   
   if (user && (await user.matchPassword(mot_de_passe))) {
    generateToken(res, user._id);
    console.log(user);
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        d_ness: user.d_ness,
        genre_prefere: user.genre_prefere,
        role: user.role
      }
    });
  } else {
    return next(new HttpError("Invalid (username|email) ,password", 401));
  }
  
 
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

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/user/logout
 * @access  Public
 */
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "Logged out successfully" });
};
/**
 * @desc    Update user profile
 * @route   PUT /api/user/settings
 * @params  username || email || newPw(new password) && oldPw(old password)
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs , check your data ", 422));
  }

  const { nom, email, newPw, oldPw } = req.body;

  // Check if none of the required fields are provided
  if (!nom && !email && !newPw) {
    return next(new HttpError("Invalid Data", 400));
  }

  // this to not select pw when updating username or email to not
  // get an error cuz the pw will be >20 , so we just select it when
  // we get pw from the frontend
  let user;
  if (newPw) {
    user = await User.findById(req.user._id).select("+mot_de_passe");
  } else {
    user = await User.findById(req.user._id);
  }

  if (user) {
    user.nom = nom || user.nom;
    user.email = email || user.email;

    /* we still to make verification of last password before updating
     to new password , so we need to get the old password from
     body and verify it with the one in DB before updating to the
     new Password !!! */
    //--------- USE THAT oldPw IN BODY-PARSER ------------

    /*  Check if newPw is provided and oldPw exists to excute the 
      update of password */
    if (newPw && oldPw) {
      // Check if oldPw matches the current password stored in the database
      // Use matchPassword() to crypt the pw to make test successfully
      if (await user.matchPassword(oldPw)) {
        user.mot_de_passe = newPw;

      } else {
        return next(new HttpError("Invalid old password", 401));
      }
    }

    const updatedUser = await user.save();

    let msg;
    if (nom) {
      msg = `username updated successfully to ${nom}`;
    } else if (email) {
      msg = `email updated successfully ${email}`;
    }

    res.json({
      msg,
      _id: updatedUser._id,
      nom: updatedUser.nom,
      email: updatedUser.email,
      password: newPw,
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

module.exports = {
  updateUserProfile,
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
};
