import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const bussinesstype = await req.json();
  const prompt = `
You are a creative business advisor. Write a **short, catchy description** that explains the store and suggests an **ideal partner business** for sharing the space to reduce rent costs.

Use these details:
- **Business Type:** ${bussinesstype}
- **Tone:** Friendly, professional, and clear
- **Length:** 15–25 words
- **Goal:** Help small business owners attract customers and find a compatible partner to share the store
- **Example partners:** For a café: bakery, sweets shop, smoothie bar; for a gaming lounge: snack bar, VR experience; for a yoga studio: health café, wellness store.

Provide **one paragraph**, ready to display directly on a website or app. Avoid extra symbols, brackets, or markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
  return NextResponse.json(response.text);
}
