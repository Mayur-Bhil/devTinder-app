const express = require("express");
const UserRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

// Get received connection requests
UserRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl", "about"])
      .populate("toUserId", ["firstName", "lastName"]);
    
    res.json({
      message: "Received Connection Requests",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
});

// Get accepted connections (your connections)
UserRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "skills"])
      .populate("toUserId", ["firstName", "lastName", "photoUrl", "about", "skills"]);

    // Extract the connected users (not the logged-in user)
    const connections = connectionRequests.map((request) => {
      if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return request.toUserId;
      }
      return request.fromUserId;
    });

    res.json({
      message: "Your Connections",
      data: connections,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
});

// Get feed (users you can connect with)
UserRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Find all connection requests (sent and received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId");
    
    // Create set of blocked users (users you already have connection requests with)
    const blockedUsers = new Set();
    connectionRequests.forEach((request) => {
      blockedUsers.add(request.fromUserId.toString());
      blockedUsers.add(request.toUserId.toString());
    });

    // Find users not in blocked list and not the logged-in user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(blockedUsers) } }, 
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName photoUrl skills about age")
      .skip(skip)
      .limit(limit);

    res.json({
      message: "User Feed",
      data: users,
      pagination: {
        currentPage: page,
        limit: limit,
        totalUsers: users.length
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
});

module.exports = UserRouter;