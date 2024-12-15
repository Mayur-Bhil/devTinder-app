const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        minLength:8
    },
    lastName :{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,  
    },
    password :{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:50
    },
    gender:{
        type:String,
        validate:(value)=>{
            if(["male","female","others"].includes(value)){
                throw new Error("Gender Data Is Not Valid");
                
            }
        },
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"The default About For The User"
    },
    skills:{
     type:[String],
    }
},{ timestamps: true })

const User = mongoose.model("User",userSchema);
module.exports = User;