const validator = require('validator');

const validateUserData = (userData) => {
    const { firstname, lastname, emailid, password } = userData;
    if (!firstname || !lastname || !emailid || !password) {
        throw new Error("All fields are required");
    } else if (!validator.isEmail(emailid)) {
        throw new Error("Invalid email address");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    } else if (!validator.isLength(firstname, { min: 2, max: 30 }) || !validator.isLength(lastname, { min: 2, max: 30 })) {
        throw new Error("First name and last name must be between 2 and 30 characters");
    }

}
module.exports = validateUserData;