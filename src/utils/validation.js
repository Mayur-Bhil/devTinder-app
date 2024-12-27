const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password}  = req.body;

    if(!firstName || !lastName){
        throw new Error("Please Enetr THe Name..!");
        
    }else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("FirstName Should be in between 4 and 50");
        
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is Not Valid");
        
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter The Strong Password ...Use Uppercase,specialCharacters max length:8 etc");
        
    }
}
const validateProfileEditData = (req) => {
    const isUpdateAllowed = ["emailId","firstName","lastName","skills","photourl","gender","about"];
    Object.keys(req).every((fields) => {
        isUpdateAllowed.includes(fields);
    });


}
module.exports = {
    validateSignUpData,
    validateProfileEditData
}