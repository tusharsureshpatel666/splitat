import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    const record = await prisma.otp.findFirst({
      where: { phone },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "OTP not found" }, { status: 400 });
    }

    // Check expiry
    if (record.expiresAt < new Date()) {
      await prisma.otp.deleteMany({ where: { phone } });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Check match
    if (record.code !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // 1️⃣ Mark phone verified
    await prisma.user.updateMany({
      where: { phone },
      data: { phoneVerified: true },
    });

    // 2️⃣ Delete OTP after success
    await prisma.otp.deleteMany({
      where: { phone },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
