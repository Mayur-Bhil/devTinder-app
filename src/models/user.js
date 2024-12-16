const mongoose = require("mongoose")
const validator = require("validator")
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email Address ..."+ value);
                
            }
        }
    },
    password :{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password"+ value);
                
            }
        }
        
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
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid Photo URL..~"+ value);
                
            }
        }
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