const express = require("express")
const connectDB = require("./config/database.js")
const app = express();
const port  = 3000;
const User = require("./models/user.js")

app.post("/signup",async (req,res)=>{
    //createing a new Instance OF a model and Sending The DUmmy Data
    const user = new User({
        firstName:"Mayur",
        lastName:"Bhil",
        emailId: "mayur@gmail.com",
        password:"Mayur@123",
        age:18,
        gender:"male"
    });
   try{
    await user.save();
    res.send("User Added SuccessFully")
   }catch(err){
        res.status(400).json("Error User",err)
   }
})

connectDB()
.then(()=>{
    console.log("Database Connections Eastablish");
    app.listen(port,()=>{
        console.log(`app is listening On Port ${port}`);
    })

}).catch((err)=>{
    console.error("Database COnnection Error ...!",err)
})