
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
         const {token} = req.cookies;
         
        
         if(!token){
            throw new Error("Invalid Token..!");
            
         }

    
    
        const {_id} = decoded;

        const user = await User.findbyId(_id);
        if(!user){
            throw new Error("User Does Not Exist");
        }
        req.user = user;
        next();

    } catch (error) {
            res.status(400).send("bad Request"+error.message);
    }
}   

module.exports = {userAuth};