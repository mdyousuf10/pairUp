const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Add it to your environment or .env file.");
}

const gemini = new GoogleGenAI({
    apiKey
});

module.exports = gemini;