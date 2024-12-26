const express = require('express');
const RequestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");

RequestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("Sent COonneection Request");
    res.send(User.firstName + " " + "Sent COonneection Request");
  });

module.exports = RequestRouter;