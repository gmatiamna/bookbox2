const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Admin = require("../models/User");
// Admin signup controller
const signupAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs, check your data', 422));
    }
  
    const { email, nom, mot_de_passe } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new HttpError('Email already exists, please choose another one', 422));
      }
  
   
  
      // Create new admin user
      const createdAdmin = new User({
        email,
        nom: nom.toLowerCase(),
        mot_de_passe,
        role: 'admin',  // Set the role to 'admin'
        banned: false
      });
  
      // Save to database
      await createdAdmin.save();
      
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
      return next(new HttpError('Creating admin failed, please try again later', 500));
    }
  };
  module.exports = {
    signupAdmin
   
  };
  