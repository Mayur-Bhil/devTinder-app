const express = require('express');
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userAuth } = require('../middlewares/auth');
const {validateProfileEditData} = require("../utils/validation");

profileRouter.get("/profile/view", async (req, res) => {
    try {
      const cookies = req.cookies;
      const { token } = cookies;
      // validate the Token
      if (!token) {
        throw new Error("Invalid Token ");
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { _id } = decoded;
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User Does Not exist ..!");
      }
      res.send(user);
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  });
 
  profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debug log
        
        if(!validateProfileEditData(req)){
            return res.status(400).json({ 
                success: false, 
                message: "Invalid Edit Request - Please check your input data" 
            });
        }
        
        const loggedInUser = req.user;
        console.log(loggedInUser);
        
        
        // Only update provided fields
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined && req.body[key] !== '') {
                loggedInUser[key] = req.body[key];
            }
        });

        await loggedInUser.save();
        
        res.json({ 
            success: true, 
            message: `${loggedInUser.firstName} Your Profile was Updated Successfully`,
            user: loggedInUser 
        });
        
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error: " + error.message 
        });
    }
});
module.exports = profileRouter;  