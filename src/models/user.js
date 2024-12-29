const mongoose = require("mongoose");
const validator = require("validator");
const jwt =   require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const secret = process.env.JWT_SECRET_KEY;


const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 8,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email Address ..." + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      enum:{
        values:["male","femele","others"],
        message:`${value} is Not a valid gender type`
      },  
      validate: (value) => {
        if (["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data Is Not Valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid Photo URL..~" + value);
        }
      },
    },
    about: {
      type: String,
      default: "The default About For The User",
    },
    skills: {
      type: [String],
      min: [4, 'Skills Can Not Be Less Than 4'],
      max: 12
    },
  },
  { timestamps: true }
);


userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
}; 

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};



const User = mongoose.model("User", userSchema);

module.exports = User;
