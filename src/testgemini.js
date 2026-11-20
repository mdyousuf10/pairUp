import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// async function testModels() {
//     try {
//         const result = await gemini.models.list();

//         for await (const model of result) {
//             console.log({
//                 name: model.name,
//                 supportedActions: model.supportedActions,
//             });
//         }
//     } catch (error) {
//         console.error("Model listing failed:", error);
//     }
// }

// testModels();
module.exports = gemini;
