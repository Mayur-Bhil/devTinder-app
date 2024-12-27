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
      const decoded = await jwt.verify(token, secret);
      const { _id } = decoded;
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User Does Not exist ..!");
      }
      res.send(user);
    } catch (error) {
      res.send("Client Error :" + error);
    }
  });
 
  profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
         if(!validateProfileEditData(req)){
          throw new Error("Invalid Edit Request");
          
         }
         const loggedInUser = req.user;
         console.log(loggedInUser);
         Object.keys(req.body).forEach((key)=>{
          loggedInUser[key] = req.body[key];
         })

        await loggedInUser.save();
         res.send(`${loggedInUser.firstName} Your Profile was Updated Successfully`);
      }
      catch (error) {
        res.send("Client Error :" + error);
      }
      
  });
module.exports = profileRouter;  