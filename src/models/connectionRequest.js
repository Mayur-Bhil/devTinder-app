
const mongoose = require("mongoose");
const comnnectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }, 
    status:{
        type: String,
        default: "pending",
        enum: ["ignore","accepted","rejected","interested"],
        message :`${value }Invalid Status` 
    }
})