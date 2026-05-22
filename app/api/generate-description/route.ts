import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const bussinesstype = await req.json();
  const prompt = `
Write a **creative, short, and catchy store description** for a business. 
Use the following details:

- **Business Type:** ${bussinesstype}
- **Tone:** Friendly, engaging, and professional
- **Length:** Maximum 10 to 20 words
- **Style:** Can be modern, fun, or bold depending on the type
- **Goal:** Attract customers and clearly convey what the store offers

Provide **one paragraph**, ready to display directly on a website or app. Avoid extra symbols, markdown, or brackets.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
  return NextResponse.json(response.text);
}
