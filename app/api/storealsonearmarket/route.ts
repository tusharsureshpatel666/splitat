import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 🔐 Check session
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // 👤 Get user business type
    const userBusiness = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        userBussinessType: true,
      },
    });

    if (!userBusiness) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!userBusiness.userBussinessType) {
      return NextResponse.json(
        { success: false, message: "No business type assigned" },
        { status: 400 },
      );
    }

    // 🏢 Find business cache
    const businessType = await prisma.businessTypeCache.findUnique({
      where: {
        businessType: userBusiness.userBussinessType,
      },
      select: {
        places: true,
      },
    });

    if (!businessType) {
      return NextResponse.json(
        { success: false, message: "Business type data not found" },
        { status: 404 },
      );
    }

    // ✅ Success
    return NextResponse.json(
      {
        success: true,
        places: businessType.places,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("BusinessType API Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
