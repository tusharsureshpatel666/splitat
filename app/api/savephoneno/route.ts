import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Correct way to read body
    const body = await req.json();
    const userId = await auth()
    const { phone } = body;

    if (!phone || !userId?.user?.id) {
      return NextResponse.json(
        { error: "Phone and userId are required" },
        { status: 400 },
      );
    }

    // ✅ Update user
    const user = await prisma.user.update({
      where: {
        id: userId.user.id, // OR email if you're using that
      },
      data: {
        phone: phone,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
