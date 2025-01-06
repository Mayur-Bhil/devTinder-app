const express = require("express");
const UserRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

UserRouter.get("/user/requests/recevied", userAuth, async (req, res) => {
  try {
    const LoggedInuser = req.user;
    const ConnectionRequestes = await ConnectionRequest.find({
      toUserId: LoggedInuser._id,
      status: "interested",
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    
    res.json({
      message: "Connection Requests",
      data: ConnectionRequestes,
    });
  } catch (error) {
    res.send("Somthing Went Wrong..!", error.message);
  }
});

UserRouter.get("/user/requests/accepeted", userAuth, async (req, res) => {
  try {
    const LoggedInuser = req.user;
    const ConnectionRequestes = await ConnectionRequest.find({
      $or: [
        { toUserId: LoggedInuser, status: "accepted" },
        { formUserId: LoggedInuser, status: "accepted" },
      ],
    }).populate("fromUserId", ["firstName", "lastName"]);

    const Data = ConnectionRequestes.map((request) => {
           if(request.formUserId._id.toString() === LoggedInuser._id.toString()){                                                                                                                                                                                                                                   
                 return request.toUserId;
           }
           return request.formUserId;
    });

    res.json({
      message: "Connection Requests",
      Data,
    });
  } catch (error) {
    res.send("Somthing Went Wrong..!", error.message);
  }
});

UserRouter.get("/Feed",userAuth,async(req,res)=>{
  try {
    const loggedInUser =req.user;
    //find All request Sent and recived
    const ConnectionRequestes = await ConnectionRequest.find({
      $or:[{formUserId:loggedInUser._id},{toUserId:LoggedInuser._id}]
    }).select("fromUserId toUserId status");
    
    const Blockedusers = new Set();
    ConnectionRequestes.foreEach((request)=>{
      Blockedusers.add(request.fromUserId);
      Blockedusers.add(request.toUserId);

    });
    const Users = await User.find({
    $and:[
      {_id:{$nin:Array.from(Blockedusers)}}, 
      {_id:{$ne:loggedInUser._id}},
      ],
    }).select("firstName lastName emailId skills about photoUrl");
    
    res.send("feed",Users);

  } catch (error) {
      res.status(400).send("Somthing Went Wrong..!", error.message);
  }
})

module.exports = UserRouter;
