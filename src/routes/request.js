const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const requestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest")

requestRouter.post("/sentrequest/:status/:toUserId", authMiddleware, async(req, res) => {
    const { toUserId, status } = req.params;
    // res.send(toUserId + " " + status)
    const fromUserId = req.user._id;
    console.log(fromUserId)

    const newRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,

    });

    const data = await newRequest.save();

    res.json({
        message: req.user.firstname + "is" + status + "in" + toUserId,
        data
    })
})

module.exports = requestRouter;