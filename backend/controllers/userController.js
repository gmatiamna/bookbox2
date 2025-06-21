const asyncHandler = require("express-async-handler");
const User = require('../models/User');
const Book = require('../models/Book');
const Offer=require('../models/Offer')
const UserLibrary = require('../models/Userlibrary'); // adjust the path accordingly

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/generateToken");
const genre = require('../utils/genre');
const nodemailer = require('nodemailer');
const cloudinary = require("../cloudinary/cloudinary");
const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/x-icon", "image/gif", "image/webp"];
// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { nom, email, d_ness, mot_de_passe } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HttpError("User already exists", 400));
  }

  //  Default values
  let claimedOffer = null;
  let offerExpiresAt = null;

  //  Find special offer
  const offer = await Offer.findOne({ type: "first_time" }); 

  if (offer) {
    claimedOffer = offer._id;
    offerExpiresAt = new Date(Date.now() + (offer.duration_days || 15) * 24 * 60 * 60 * 1000);
  }

  const newUser = await User.create({
    nom,
    email,
    d_ness,
    mot_de_passe,
    genre_prefere: [],
    firstLogin: true,
    claimedOffer,
    offerExpiresAt,
  });

  generateToken(res, newUser._id);

  res.status(201).json({
    message: "User signed up successfully",
    user: {
      id: newUser._id,
      nom: newUser.nom,
      email: newUser.email,
      d_ness: newUser.d_ness,
      genre_prefere: newUser.genre_prefere,
      role: newUser.role,
      claimedOffer,
      offerExpiresAt,
    },
    ...(offer && {
      offer: {
        title: offer.title,
        description: offer.description,
        discount: offer.discount,
        validUntil: offerExpiresAt,
        bookId: offer.book,
      },
    }),
  });
});

const updatePreferredGenres = async (req, res) => {
  try {
    console.log("Request body:", req.body); // 👈 Add this line here

    const userId = req.user._id;
    const { genre_prefere: genres } = req.body;

    if (!genres || !Array.isArray(genres)) {
      return res.status(400).json({ message: 'Invalid genres format' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.genre_prefere = genres;
    await user.save();

    res.status(200).json({ message: 'Genres updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const uploadProfilePhoto = async (req, res) => {
  try {
    const { image, fileType } = req.body;

    if (!image || !fileType) {
      return res.status(400).json({ error: "Image and fileType are required." });
    }

    if (!allowedFormats.includes(fileType)) {
      return res.status(400).json({ error: "Unsupported file format." });
    }

    const base64DataUri = `data:${fileType};base64,${image}`;

    const result = await cloudinary.uploader.upload(base64DataUri, {
      folder: "avatars",
      public_id: `avatar_${Date.now()}`,
    });

    // ✅ Get user ID from auth middleware (assuming JWT auth is used)
    const userId = req.user.id;
console.log("Authenticated user ID:", req.user);

    // ✅ Update the user’s profile picture URL in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photo_profil: result.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile photo uploaded and updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
};


// @desc    Authenticate user and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, mot_de_passe } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).select("+mot_de_passe").populate("claimedOffer");

  if (user && (await user.matchPassword(mot_de_passe))) {
    generateToken(res, user._id);

    // 🟩 Check if offer is still valid
    let activeOffer = null;
    if (user.claimedOffer && user.offerExpiresAt && new Date() < user.offerExpiresAt) {
      const { title, description, discount, book, _id } = user.claimedOffer;
      activeOffer = {
        id: _id,
        title,
        description,
        discount,
        bookId: book,
        validUntil: user.offerExpiresAt,
      };
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        d_ness: user.d_ness,
        genre_prefere: user.genre_prefere,
        role: user.role,
      },
      isAdmin: user.role === 'admin',
      ...(activeOffer && { activeOffer }), // only include if still valid
    });
  } else {
    return next(new HttpError("Invalid (username|email) or password", 401));
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
const getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const totalPoints = user.points.reduce((sum, p) => sum + p.amount, 0);

    res.status(200).json({ totalPoints, history: user.points });
  } catch (error) {
    res.status(500).json({ message: "Failed to get points", error });
  }
};
module.exports = { getUserPoints };

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HttpError("User not found with that email address", 404));
  }

  // Generate password reset token
  const resetToken = user.generateResetPasswordToken();
  await user.save(); // Save the user with the reset token

  // Create a password reset URL
  const resetUrl = `http://${req.headers.host}/api/users/reset-password?token=${resetToken}`;

  // Send email with the reset token (using Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service here
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password', // Replace with environment variables in production
    },
  });

  const mailOptions = {
    to: email,
    from: 'your-email@gmail.com',
    subject: 'Password Reset Request',
    text: `To reset your password, please click on the following link: \n\n${resetUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    return next(new HttpError('Error sending email, please try again later', 500));
  }
});

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const { token, newPassword } = req.body;

  // Find user by token and check if token is valid
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    return next(new HttpError('Password reset token is invalid or has expired', 400));
  }

  // Update password and clear reset token
  user.mot_de_passe = newPassword; // Make sure to hash the new password before saving
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    message: 'Password has been reset successfully',
  });
});
const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;
    const library = await Library.findOne({ user: userId });

    if (!library) return res.status(404).json({ message: 'Library not found' });

    const rentedCount = library.books.filter(book => book.type === 'location').length;
    const boughtCount = library.books.filter(book => book.type === 'achat').length;

    // Optional: you can calculate points or other stats here too

    res.json({ rentedCount, boughtCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateUserProfile,
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,uploadProfilePhoto,getUserPoints,updatePreferredGenres, forgotPassword,
  resetPassword,getUserStats
  
};
