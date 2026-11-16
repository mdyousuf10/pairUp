const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const feedRouter = express.Router()

feedRouter.get("/feed", authMiddleware, async(req, res) => {
    res.json({
        message: "working fine"
    })

})

module.exports = feedRouter;