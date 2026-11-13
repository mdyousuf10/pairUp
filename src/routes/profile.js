const express = require("express");
const profileRouter = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");
const user = require("../models/user.model")
const validateProfileData = require("../utils/ValidateProfileData")


profileRouter.get("/view", authMiddleware, async(req, res) => {
    try {
        const userProfile = await req.user;
        if (!userProfile) {
            throw new Error("User not found!")
        }
        res.send(userProfile);
    } catch (err) {
        res.status(500).send("Error" + err.message);
    }
})

profileRouter.patch("/edit", authMiddleware, async(req, res) => {
    try {
        if (!validateProfileData(req.body)) {
            throw new Error("Invalid fields in request body");
        };

        const loggedinUser = req.user;
        console.log(loggedinUser)
        Object.keys(req.body).forEach((key) => loggedinUser[key] = req.body[key]);
        console.log(loggedinUser)
        loggedinUser.save();

        res.send("Profile updated successfully")

    } catch (err) {
        res.status(500).send("Error" + err.message);
    }
})

module.exports = profileRouter;