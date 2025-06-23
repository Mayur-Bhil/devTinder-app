const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

// Use the same secret key as in your auth router
const secret = process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production";

const userAuth = async (req, res, next) => {
    try {
        // Get token from cookies
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // Verify token with the SAME secret used in login
        const decoded = await jwt.verify(token, secret);
        const { _id } = decoded;
        
        // Find user by ID
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        
        // Handle different types of JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

        // Generic error handling
        res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};

module.exports = { userAuth };