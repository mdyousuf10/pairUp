const express = require("express")
const User = require("../models/user.model")
const UserRouter = express.Router();


UserRouter.get("/AllUser", async(req, res) => {
    try {
        // Passing no arguments or {} fetches every document in the collection
        const users = await User.find({}).select('-password');
        res.json({
            status: 200,
            message: "Available users",
            data: users
        })
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
})

module.exports = UserRouter;