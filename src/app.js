const express = require("express")
const connectDB = require("./config/database.js")
const app = express();
const port  = 3000;
const User = require("./models/user.js")

app.use(express.json())
app.post("/signup",async (req,res)=>{
    //createing a new Instance OF a model and Sending The DUmmy Data
    console.log(req.body);
    
    const user = new User(req.body);
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