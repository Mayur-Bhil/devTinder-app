const mongoose = require("mongoose");
require("dotenv").config(); // Load variables from .env

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
      useUnifiedTopology: true,
  });
};

module.exports = connectDB;