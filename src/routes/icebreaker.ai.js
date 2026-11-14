const { authMiddleware } = require("../middleware/authmiddleware");
const express = require("express")
const User = require("../models/user.model")

const generateIcebreakersRouter = express.Router();


generateIcebreakersRouter.post("/icebreaker/:userId", authMiddleware, async(req, res) => {
    try {
        if (!process.env.OPENAI_API_KEY && !process.env.OPENAI_ADMIN_KEY) {
            return res.status(503).json({
                message: "Icebreaker generation is unavailable because OpenAI credentials are not configured"
            });
        }

        const openai = require("../openai.js");

        // Logged-in user
        const currentUser = await User.findById(req.user._id)
            .select("firstname skills interests bio");

        // Other developer
        const otherUser = await User.findById(req.params.userId)
            .select("firstname skills interests bio");

        if (!currentUser || !otherUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const prompt = `
        You are an AI assistant for a developer networking application.

        Generate 3 natural and engaging conversation starters
        for these two developers.

        Developer 1:
        Name: ${currentUser.firstname}
        Skills: ${currentUser.skills}
        Interests: ${currentUser.interests}
        Bio: ${currentUser.bio}

        Developer 2:
        Name: ${otherUser.firstname}
        Skills: ${otherUser.skills}
        Interests: ${otherUser.interests}
        Bio: ${otherUser.bio}

        Requirements:
        1. Make the questions personalized.
        2. Find common interests or complementary skills.
        3. Keep the questions friendly and short.
        4. Avoid generic questions.
        5. Return exactly 3 suggestions.
        6. Return only a JSON array of strings.
        `;

        const response = await openai.responses.create({
            model: process.env.OPENAI_MODEL,
            input: prompt
        });

        const icebreakers = JSON.parse(response.output_text);

        res.status(200).json({
            success: true,
            icebreakers
        });

    } catch (error) {
        console.error("Icebreaker error:", error);

        res.status(500).json({
            message: "Unable to generate icebreakers"
        });
    }
})



module.exports = generateIcebreakersRouter;