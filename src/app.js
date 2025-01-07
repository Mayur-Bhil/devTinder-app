const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const User = require("./models/user.js");
const authRouter = require("./routes/auth.Router.js");
const profileRouter = require("./routes/profile.Router.js");
const requestRouter = require("./routes/request.Router.js");
const UserRouter = require("./routes/user.Router.js");  
const secret = "xyz";

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",UserRouter);


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
    if (data?.skills.length > 10) {
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
    console.error("Database Connection Error ...!", err);
  });
  

module.exports = secret;