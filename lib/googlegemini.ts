import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function GeminCalling(prompt: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // In the latest SDK, the generated text is in response.text
    let textOutput = response.text;

    if (!textOutput) return [];
    textOutput = textOutput.replace(/```(json)?/g, "").trim();

    // Parse the JSON array returned by Gemini
    const parsed = JSON.parse(textOutput);

    if (Array.isArray(parsed)) return parsed;

    return [];
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return [];
  }
}
