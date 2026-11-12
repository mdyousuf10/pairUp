const express = require("express");
const profileRouter = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");
const user = require("../models/user.model")


profileRouter.get("/getprofile", authMiddleware, async(req, res) => {
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

module.exports = profileRouter;