const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const requestRouter = express.Router();

requestRouter.post("/sendrequest", authMiddleware, (req, res) => {
    res.send(`Request is sent successfully by ${req.user.firstname}`);
})

module.exports = requestRouter;