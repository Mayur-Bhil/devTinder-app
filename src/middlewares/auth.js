const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        // Get token from cookies
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Verify token with environment variable secret
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { _id } = decoded;
        
        // Fixed: findbyId → findById
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        // Handle different types of JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        // Generic error handling
        res.status(500).json({
            message: "Authentication failed",
            error: error.message
        });
    }
};

module.exports = { userAuth };