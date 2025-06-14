const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "interested", // Fixed: changed from "pending" to match enum
      required: true,
      enum: {
        values: ["ignore", "accepted", "rejected", "interested"],
        message: `{VALUE} incorrect status type`, // Fixed: {value} to {VALUE}
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre("save", function(next) { // Fixed: removed async (not needed)
  const connectionRequest = this;
  
  // Check if FromUserID and toUserId are the same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send Connection Request to yourself!");
  }
  next();
});

// Fixed: removed 'new' keyword
const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;