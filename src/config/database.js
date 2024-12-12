const mongoose = require("mongoose")
const  connectDB = async() => {
    await mongoose.connect("mongodb+srv://Mayur:daJKMq3j5zI52cos@cluster0.7ruur.mongodb.net/devTinder");
};


module.exports = connectDB;