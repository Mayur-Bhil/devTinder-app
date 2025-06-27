  const express = require("express");
  const cors = require("cors")
  const mongoose = require("mongoose");
  const connectDB = require("./config/database.js");
  const cookieParser = require("cookie-parser");
  const User = require("./models/user.js");
  const authRouter = require("./routes/auth.Router.js");
  const profileRouter = require("./routes/profile.Router.js");
  const requestRouter = require("./routes/request.Router.js");
  const UserRouter = require("./routes/user.Router.js");


  const app = express();
  const port = process.env.PORT || 3000;
  const secret = process.env.SECRET || "your-secret-key"; 
 
  app.use(cors({
    origin:"http://localhost:5173 ",
    credentials:true
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/", authRouter);
  app.use("/", profileRouter);
  app.use("/", requestRouter);
  app.use("/", UserRouter);

 
  app.get("/user", async (req, res) => {
    try {
     
      const userEmail = req.query.emailId;
      
      if (!userEmail) {
        return res.status(400).json({ error: "Email ID is required" });
      }

      const users = await User.find({ emailId: userEmail });
      
      if (users.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(users);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/feed", async (req, res) => {
    try {
     
      const limit = parseInt(req.query.limit) || 10;
      const skip = parseInt(req.query.skip) || 0;
      
      const users = await User.find({})
        .limit(limit)
        .skip(skip)
        .select('-password'); 
      
      res.json(users);
    } catch (err) {
      console.error("Error fetching feed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/findone", async (req, res) => {
    try {
      const userEmail = req.query.emailId; // Use query params for GET
      
      if (!userEmail) {
        return res.status(400).json({ error: "Email ID is required" });
      }

      const user = await User.findOne({ emailId: userEmail }).select('-password');
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json(user);
    } catch (err) {
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/user", async (req, res) => {
    try {
      const userId = req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const ALLOWED_UPDATES = [
        "userId",
        "photoUrl", 
        "about",
        "gender",
        "age",
        "skills",
      ];

      const isUpdateAllowed = Object.keys(data).every(key => 
        ALLOWED_UPDATES.includes(key)
      );

      if (!isUpdateAllowed) {
        return res.status(400).json({ error: "Invalid update fields" });
      }

      if (data.skills && data.skills.length > 10) {
        return res.status(400).json({ error: "Skills cannot be more than 10" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        data, 
        {
          new: true, // Return updated document
          runValidators: true,
        }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        message: "User profile updated successfully",
        user: updatedUser 
      });
    } catch (error) {
      console.error("Error updating user:", error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
  }); 

  // Start server
  connectDB()
    .then(() => {
      console.log("Database connection established");
      app.listen(port, '0.0.0.0', () => {
        console.log(`Server listening on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });

  module.exports = { app, secret };