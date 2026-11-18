const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const requestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest")
const user = require("../models/user.model")

requestRouter.post("/request/send/:status/:toUserId", authMiddleware, async(req, res) => {

    try {


        const { toUserId, status } = req.params;


        // res.send(toUserId + " " + status)
        const fromUserId = req.user._id;

        const allowedStatus = ["ignore", "interested"];

        if (!allowedStatus.includes(status)) {
            return res
                .status(400)
                .json({ message: "Invalid status type :" + " " + status })

        }

        const toUser = await user.findById(toUserId);
        if (!toUser) {
            return res
                .status(400)
                .json({ message: "User not found status type" });

        }

        const existingConnectionRequest = await connectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        })

        if (existingConnectionRequest) {
            return res
                .status(400)
                .json({ message: "Connection request already exist!!!" });
        }

        const newRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status,

        });

        const data = await newRequest.save();

        res.json({
            message: req.user.firstname + "is" + status + "in" + toUser.firstname,
            data
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = requestRouter;