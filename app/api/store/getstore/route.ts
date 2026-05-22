import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GeminCalling } from "@/lib/googlegemini";
import { Prisma } from "@/lib/generated/prisma";

export async function POST(req: Request) {
  try {
    const { bussinessType } = await req.json();

    if (!bussinessType) {
      return NextResponse.json(
        { error: "businessType is required" },
        { status: 400 },
      );
    }

    const geminiPrompt = `
      List 5-10 business types that are compatible or related with this business: "${bussinessType}".
      Return only a JSON array of strings.
    `;

    const compatibleTypes: string[] = await GeminCalling(geminiPrompt);

    if (!compatibleTypes.length) {
      return NextResponse.json({ stores: [] }, { status: 200 });
    }

    // Split Gemini suggestions into keywords for flexible matching

    const orConditions: Prisma.StoreWhereInput[] = compatibleTypes.flatMap(
      (type) =>
        type.split(" ").map((keyword) => ({
          businessType: {
            contains: keyword,
            mode: Prisma.QueryMode.insensitive,
          },
        })),
    );

    const stores = await prisma.store.findMany({
      where: { OR: orConditions },
      select: {
        id: true,
        title: true,
        desc: true,
        country: true,
        state: true,
        city: true,
        pin: true,

        priceInr: true,
        bannerImageUrl: true,
        businessType: true,

        images: {
          select: {
            id: true,
            url: true,
            order: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json({ stores }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
