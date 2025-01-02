const express = require("express");
const RequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

RequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const ALLOWED_STATUS = ["ingnored","interested"];
      if(!ALLOWED_STATUS.includes(status)){
        return res.status(400).json({
            message : "invalid Status Type :"+ status
        })
    }
    
    const touser = await User.findById(toUserId);
    if(!touser){
      res.status(404).json({
        message:"User Not Found"
    })
  }
    //check If is an existing send connection Request
    const excestingConnectionRequest = connectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId,toUserId:fromUserId},
        ],
    })
    if(excestingConnectionRequest){
        return res.status(400).json({
          message:"Connection reeuest IS already Exists",
        })
    }

     const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
     })

  const data = await connectionRequest.save();
      res.json({
          message: req.user.firstName+""+status+"in"+touser.firstName,
          data,
      })
    }catch (error) {
      res.status(404).json({
        error: error.message,
      });
    }
  }
);
RequestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try { 
    const loggedInUser = req.user;
    const {status,requestId} = req.params;

    const ALLOWED_STATUS = ["accepted","rejected"];
    if(!ALLOWED_STATUS.includes(status)){
      return res.status(400).json({
          message : "invalid Status Type :"+ status
      })
    }

    const connectionrequest = await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    });
    if(!connectionrequest){
     return res.send(404).json({
        message:"Connection Request Not Found"
      })
    }

    connectionrequest.status = status; 
    const data = await connectionrequest.save();
    res.json({
      message:"Connection Request "+status,data
    });

  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }

});

module.exports = RequestRouter;
