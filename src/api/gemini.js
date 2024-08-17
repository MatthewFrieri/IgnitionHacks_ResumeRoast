import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function promptGemini(prompt, setAnswer) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    setAnswer(text);
}
