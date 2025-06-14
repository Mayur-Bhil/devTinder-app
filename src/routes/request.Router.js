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

      // Fixed: corrected typo "ingnored" to "ignored"
      const ALLOWED_STATUS = ["ignored", "interested"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status Type: " + status
        });
      }

      // Check if target user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User Not Found"
        });
      }

      // Fixed: added await and corrected variable name
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exists"
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });

      const data = await connectionRequest.save();
      
      res.json({
        message: `${req.user.firstName} sent ${status} request to ${toUser.firstName}`,
        data,
      });
      
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

RequestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const ALLOWED_STATUS = ["accepted", "rejected"];
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Type: " + status
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    });

    if (!connectionRequest) {
      // Fixed: res.send(404) to res.status(404)
      return res.status(404).json({
        message: "Connection Request Not Found"
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    
    res.json({
      message: "Connection Request " + status,
      data
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = RequestRouter;