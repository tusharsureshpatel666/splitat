import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { businessType } = await req.json();
    if(!businessType){
        return NextResponse.json({error: "Unauthorized"})
    }

    const prompt = `
You are a location marketing expert.

A business type is: "${businessType}".

Your task is to identify places where the target customers for this business are most likely to gather nearby.

Return only Google Maps place types that represent locations where potential customers spend time.

Rules:
- Return between 4 and 5 place types.
- Use valid Google Maps place categories when possible.
- Focus on places with high foot traffic.
- Do not include explanations.

Return the result strictly as a JSON array.

Example:
["school","university","shopping_mall","office","gym","park","tourist_attraction"]
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text;

    // parse JSON safely
    let places;
    try {
      places = JSON.parse(text);
    } catch {
      places = text;
    }

    return NextResponse.json({ places });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 },
    );
  }
}
