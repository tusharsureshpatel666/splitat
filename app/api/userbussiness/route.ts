import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const body = await req.json();
    const session = await auth();
    const { bussiness } = body;

    if (!session?.user?.id || !bussiness) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const userBussiness = await prisma.user.update({
      where: {id: session.user.id},
      data: {
        userBussinessType: bussiness
      }
    })

    // Check cache
    const existing = await prisma.businessTypeCache.findUnique({
      where: {
        businessType: bussiness,
      },
    });

    if (existing) {
      return Response.json({
        success: true,
        source: "cache",
        data: existing.places,
      });
    }

    const prompt = `
You are a location marketing expert.

A business type is: "${bussiness}".

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

    let text = response.text || "";

    // Remove markdown if Gemini returns ```json
    text = text.replace(/```json|```/g, "").trim();

    let places;

    try {
      places = JSON.parse(text);
    } catch {
      return Response.json({
        success: false,
        error: "Invalid AI response",
      });
    }

    // Save to cache
    await prisma.businessTypeCache.create({
      data: {
        businessType: bussiness,
        places,
      },
    });

    return Response.json({
      success: true,
      source: "ai",
      data: places,
    });
  } catch (err: any) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      { status: 500 },
    );
  }
}
