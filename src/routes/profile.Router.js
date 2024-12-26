const express = require('express');
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

profileRouter.get("/profile", async (req, res) => {
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
module.exports = profileRouter;  