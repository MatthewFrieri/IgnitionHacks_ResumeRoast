import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD5zoYG0zoFbSi9mR4sbcGT_uFvbdpj4c0";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function promptGemini(prompt, setAnswer) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    setAnswer(text);
}
