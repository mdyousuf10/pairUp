const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const validateUserData = require("../utils/validations")
const bcrypt = require("bcrypt");
const user = require("../models/user.model")


const authrouter = express.Router();


authrouter.post("/signup", authMiddleware, async(req, res) => {
    //validation of data
    try {
        validateUserData(req.body);
    } catch (err) {
        return res.status(400).send(err.message);
    }
    //encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const userData = new user(req.body);
    try {
        if (await user.findOne({ emailid: req.body.emailid })) {
            return res.status(400).send("User already exists");
        }
        await userData.save()
        res.send("User is stored in the database")
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while storing user");
    }

})

authrouter.post("/login", async(req, res) => {
    const { emailid, password } = req.body;
    try {
        const userData = await user.findOne({ emailid });
        if (!userData) {
            return res.status(400).send("User not found");
        }
        const isPasswordValid = await userData.validatePassword(password);

        if (isPasswordValid) {
            //create a jwt token and send it to the user
            // const token = jwt.sign({ _id: userData._id }, "Yousuf@1234", { expiresIn: "7d" });

            const token = await userData.getjwt();
            //add the token to cookie and sent this resp back to user
            res.cookie("token", token);
            res.send("User is logged in successfully");
        } else {
            throw new Error("Invalid password");
        }
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while logging in");
    }

})

authrouter.post("/logout", authMiddleware, async(req, res) => {
    try {
        res.clearCookie("token");
        res.send("User is logged out successfully");
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while logging out");
    }
})



module.exports = authrouter;