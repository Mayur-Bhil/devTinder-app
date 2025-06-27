const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); // Fixed typo: brycrpt -> bcrypt
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const { userAuth } = require("../middlewares/auth.js");
const jwt = require("jsonwebtoken");

// Use environment variable for secret
const secret = process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production";

// SIGNUP Route
// authRouter.post("/signup", async (req, res) => {
//   try {
//     // 1) Validate the data
//     validateSignUpData(req);
    
//     const { password, firstName, lastName, emailId,age,gender,skills } = req.body;
    
//     // Check if user already exists
//     const existingUser = await User.findOne({ emailId });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "User already exists with this email" 
//       });
//     }
    
//     // 2) Encrypt the password
//     const passwordHash = await bcrypt.hash(password, 10);
    
//     // Create new user
//     const user = new User({
//       firstName,
//       lastName, 
//       emailId,
//       age,
//       gender,
//       skills,
//       password: passwordHash,
//     });
    
//     await user.save();
    
//     res.status(201).json({ 
//       success: true, 
//       message: "User registered successfully" 
//     });
    
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(400).json({ 
//       success: false, 
//       message: err.message || "Registration failed" 
//     });
//   }
// });

// SIGNUP Route - FIXED VERSION
authRouter.post("/signup", async (req, res) => {
  try {
    // 1) Validate the data
    validateSignUpData(req);
    
    const { password, firstName, lastName, emailId,about, age, gender, skills,photoUrl } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists with this email" 
      });
    }
    
    // Create new user - DON'T hash password here, let the pre-save middleware handle it
    const user = new User({
      firstName,
      lastName, 
      emailId,
      age,
      gender,
      skills,
      password,
      photoUrl,
      about // Pass plain password, pre-save middleware will hash it
    });
    
    await user.save(); // Pre-save middleware will hash the password
    
    res.status(201).json({ 
      success: true, 
      message: "User registered successfully" 
    });
    
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ 
      success: false, 
      message: err.message || "Registration failed" 
    });
  }
});

// LOGIN Route - Remove userAuth middleware (not needed for login)
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    
    // Validate input
    if (!emailId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }
    
    // Find user by email
    const user = await User.findOne({ emailId:emailId });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
    
    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId }, 
      secret, 
      { expiresIn: "7d" }
    );
    
    // Set cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      sameSite: 'lax'
    });
    
    res.status(200).json({ 
      success: true, 
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        photoUrl:user.photoUrl
      }
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// LOGOUT Route
authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.cookie("token", null ,{
      expires: new Date(0), // Set to past date
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
    
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Logout failed" 
    });
  }
});

module.exports = authRouter;