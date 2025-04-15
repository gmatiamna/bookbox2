const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/User');  // Assuming User is your model for user schema
const { generateToken } = require('../utils/generateToken');

exports.signupAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);  // Logs the validation errors for debugging
    return next(new HttpError("Invalid Inputs, check your data", 422));
  }

  const { email, nom, mot_de_passe, d_ness, role = 'admin' } = req.body;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HttpError('Email already exists, please choose another one', 422));
  }

  // Create a new admin user
  const createdAdmin = new User({
    email,
    nom: nom.toLowerCase(),  // Username is now 'nom' in the schema
    mot_de_passe,  // Plaintext password (will be hashed by Mongoose)
    d_ness,  // Date of birth is required
    role: role,  // Ensure the role is set to 'admin'
    banned: false,  // Admin is not banned by default
  });

  try {
    await createdAdmin.save();
    console.log("Admin saved successfully");
  } catch (e) {
    console.error('Error saving admin:', e);  // Log the error for debugging
    return next(new HttpError('Creating Admin failed!', 500));
  }
  generateToken(res, createdAdmin._id);
  res.status(201).json({
    msg: "Admin has been added successfully!",
    admin: createdAdmin.toObject({ getters: true }),  // Return the created admin object, excluding sensitive fields like password
  });
};
