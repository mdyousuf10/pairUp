const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const authMiddleware = async(req, res, next) => {
    let userProfile;
    try {
        const cookies = req.cookies;

        const token = cookies.token;
        if (!token) {
            throw new Error("Invalid token")
        }

        //validate the token from cookie and send the user profile if valid
        const decodedMessgae = await jwt.verify(token, "Yousuf@1234");
        const { _id } = decodedMessgae;
        userProfile = await user.findById(_id);

        if (!userProfile) {
            throw new Error("User not found!")
        }

    } catch (err) {
        return res.status(401).send("Error " + err.message);
    }
    req.user = userProfile;
    next();
}

module.exports = {
    authMiddleware
}