const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password}  = req.body;

    if(!firstName || !lastName){
        throw new Error("Please Enter Name..!");
        
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
    const isUpdateAllowed = ["firstName", "lastName", "skills", "photoUrl", "gender", "about", "age"];
    
    const requestFields = Object.keys(req.body);

    const allFieldsValid = requestFields.every((field) => isUpdateAllowed.includes(field));

    if (!allFieldsValid) {
        console.warn("Invalid fields found:", requestFields.filter(f => !isUpdateAllowed.includes(f)));
    }

    return allFieldsValid;
};

module.exports = {
    validateSignUpData,
    validateProfileEditData
}