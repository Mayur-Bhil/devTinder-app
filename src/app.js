const express = require("express");
const connectDB = require("./config/database.js");
const brycrpt = require("bcrypt")
const app = express();
const port = 3000;
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const secret = "xyz"
const {userAuth }  = require("./middlewares/auth.js")

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //createing a new Instance OF a model and Sending The DUmmy Data
  // 1)validate the Data
  // 2)Encrypt the password than save the USer
  try {
    validateSignUpData(req)
    const {password,firstName,lastName,emailId}  = req.body;
    const passwordHash = await brycrpt.hash(password,10)
    console.log(passwordHash);
    
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });
    await user.save();
    res.send("User Added SuccessFully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login",userAuth,async (req,res)=>{
  try {
      const {emailId,password} = req.body;

      const user = await User.findOne({emailId : emailId});
      if(!user){
        throw new Error("Invalid Credentials..!");
        
      }
      const isPasswordValid = await brycrpt.compare(password,user.password);

      if(isPasswordValid){
        //create jwt Token
        const token = await jwt.sign({_id: user._id},secret);
        console.log(token)

        res.cookie("token",token)

        //add the token to cookie and send the responce back to the user

        res.status(200).send("SuccessFully login")
      }else{
        throw new Error("Password is incorrect");
        
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
});

app.get("/profile",async(req,res)=>{

   try {
    const cookies = req.cookies;
    const {token}  = cookies;
    // validate the Token
    if(!token){
        throw new Error("Invalid Token ");
        
    }
    const decoded = await jwt.verify(token,secret);
    const {_id} = decoded;
   const user = await User.findById(_id);
   if(!user){
      throw new Error("User Does Not exist ..!");
      
   }
   res.send(user)

   } catch (error) {
      res.send("Client Error :"+error)
   }
  
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    console.log("Sent COonneection Request")
    res.send(User.firstName+" "+"Sent COonneection Request")

})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length == 0) {
      res.status(404).send("USer not Found ..!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Somthing Went Wrong..!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Somthing Went Wrong..!");
  }
});

app.get("/findone", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    res.send(users);
  } catch (err) {
    res.status(404).send("User Not Found ..!");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    res.send("User Deleted SuccessFUlly ..!");
  } catch (error) {
    res.status(402).send({ message: "Error Occoured" });
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("Updates Not Allowed");
    }
    if(data?.skills.length > 10){
      throw new Error("Skills Can Not grater Than 10");

    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User 2222222222Profile Updated SucessFully");
  } catch (error) {
    res.status(402).send("user Error ..!");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connections Eastablish");
    app.listen(port, () => {
      console.log(`app is listening On Port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database COnnection Error ...!", err);
  });
module.exports = {secret}