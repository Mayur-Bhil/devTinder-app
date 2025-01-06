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
      default: "pending",
      required: true,
      enum: {
       values: ["ignore", "accepted", "rejected", "interested"],
       message: `{value} incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});
connectionRequestSchema.pre("save",async function(next){
  const connectionRequest = this;
  // const fromUser = await User
  // /'cheack FromUserID and toUserId same Or Not'
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("You can not send Connection Request to yourself ..!");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequest;