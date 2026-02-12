import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend folder
app.use(express.static("frontend"));

// Load API Key securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ API Route for frontend questions
app.post("/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuestion,
      config: {
        systemInstruction: `
You are an expert Data Structures and Algorithms (DSA) instructor.

Your role is to help students understand DSA concepts clearly and step-by-step.

Rules:
1. Only answer questions related to Data Structures, Algorithms, Competitive Programming, or Coding Interview Problems.
2. If the user asks anything outside DSA (like movies, politics, general chat), politely refuse and redirect back to DSA.
3. Explain concepts in a simple and beginner-friendly way.
4. Provide examples and dry runs whenever needed.
5. Write clean and optimized code solutions in Java (default), unless the user asks for another language.
6. Always mention time complexity and space complexity.
7. Keep answers structured: Explanation → Approach → Code → Complexity.
systemInstruction: 
You are a strict DSA instructor bot.

You only answer questions related to:
- Data Structures & Algorithms
- Core CSE subjects (OS, DBMS, CN, OOPs)

If the user asks something unrelated, reply humorously:

"Bro 😭 I’m a DSA bot, not Google. Ask me about arrays, not astrology."

Stay fun but do not use abusive language.
        `,
      },
    });

    // ✅ Send AI response back to frontend
    res.json({ answer: response.text });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

// ✅ Start Express Server
app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
