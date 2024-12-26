const express = require('express');
const authRouter = express.Router();
const brycrpt = require('bcrypt');
const User = require("../models/user.js");
const {validateSignUpData} = require("../utils/validation.js");
const {userAuth} = require("../middlewares/auth.js");






authRouter.post("/signup", async (req, res) => {
    //createing a new Instance OF a model and Sending The DUmmy Data
    // 1)validate the Data
    // 2)Encrypt the password than save the USer
    try {
      validateSignUpData(req);
      const { password, firstName, lastName, emailId } = req.body;
      const passwordHash = await brycrpt.hash(password, 10);
      console.log(passwordHash);
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      await user.save();
      res.send("User Added SuccessFully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  authRouter.post("/login", userAuth, async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Invalid Credentials..!");
      }
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        //create jwt Token
        const token = await user.getJWT();
        console.log(token);
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
        });
  
        //add the token to cookie and send the responce back to the user
  
        res.status(200).send("SuccessFully login");
      } else {
        throw new Error("Password is incorrect");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  


module.exports = authRouter;