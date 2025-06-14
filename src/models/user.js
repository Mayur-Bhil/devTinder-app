const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
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
          throw new Error("invalid Email Address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password: " + value);
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
      enum: {
        values: ["male", "female", "others"], // Fixed "femele" typo
        message: `{VALUE} is not a valid gender type`
      },
      // Removed the conflicting validate function
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "The default About For The User",
    },
    skills: {
      type: [String],
      validate: {
        validator: function(arr) {
          return arr.length >= 4 && arr.length <= 12;
        },
        message: 'Skills must be between 4 and 12 items'
      }
    },
  },
  { timestamps: true }
);

// Index for better query performance
userSchema.index({ firstName: 1, lastName: 1 });

// Method to generate JWT token
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

// Method to validate password
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  return isPasswordValid;
};

// Pre-save middleware to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;