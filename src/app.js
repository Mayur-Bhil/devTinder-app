const express = require("express")
const connectDB = require("./config/database.js")
const app = express();
const port  = 3000;
const User = require("./models/user.js")

app.use(express.json())

app.post("/signup",async (req,res)=>{
    //createing a new Instance OF a model and Sending The DUmmy Data
    
    const user = new User(req.body);
   try{
    await user.save();
    res.send("User Added SuccessFully")
   }catch(err){
        res.status(400).json("Error User",err)
   }
})

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
   try{
   const users = await User.find({emailId: userEmail});
   if(users.length ==0){
        res.status(404).send("USer not Found ..!")
   }else{
        res.send(users);
   }
   
   }catch(err){
    res.status(400).send("Somthing Went Wrong..!")
   }
})

app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users)
        }catch(err){
         res.status(400).send("Somthing Went Wrong..!")
        }
})

app.get("/findone",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.findOne({emailId:userEmail});
        res.send(users)
        }catch(err){
         res.status(404).send("User Not Found ..!")
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