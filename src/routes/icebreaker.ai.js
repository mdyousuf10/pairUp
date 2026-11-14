const { authMiddleware } = require("../middleware/authmiddleware");
const express = require("express")
const User = require("../models/user.model")
require("dotenv").config();
const gemini = require("../gemini.js");


const generateIcebreakersRouter = express.Router();


generateIcebreakersRouter.post("/icebreaker/:userId", authMiddleware, async(req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({
                message: "Icebreaker generation is unavailable because Gemini credentials are not configured"
            });
        }

        const currentUser = req.user;
        const otherUser = await User.findById(req.params.userId)
            .select("firstname skills interests bio");

        if (!currentUser || !otherUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const prompt = `
        You are an AI assistant for a developer networking application.

        Write 3 short, natural, ready-to-send opening messages from Developer 1
        to Developer 2. Each message must sound like Developer 1 is speaking
        directly to Developer 2 in first person.

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
        1. Write each suggestion as a message Developer 1 could send directly
           to Developer 2, using "I" and "you" naturally.
        2. Personalize the messages using shared interests or complementary
           skills.
        3. Keep each message friendly and concise.
        4. Do not write from Developer 2's perspective or describe the
           developers in third person.
        5. Return exactly 3 distinct messages.
        6. Return only a JSON array of strings.
        7. Do not repeat the same message.
        `;

        const response = await gemini.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                maxOutputTokens: 128,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "STRING",
                    },
                },
            },
        });

        const icebreakers = JSON.parse(response.text);

        // console.log("Generated icebreakers:", icebreakers);

        res.status(200).json({
            success: true,
            icebreakers
        });

    } catch (error) {
        console.error("Icebreaker error:", error);

        res.status(500).json({

            message: error instanceof Error ? error.message : String(error)
        });
    }
})



module.exports = generateIcebreakersRouter;