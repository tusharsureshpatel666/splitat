import prisma from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number not found" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.otp.deleteMany({
      where: { phone },
    });

    await prisma.otp.create({
      data: {
        phone,
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    const response = await axios.post(
      "https://control.msg91.com/api/v5/flow/",
      {
        template_id: process.env.MSG91_TEMPLATE_ID,
        short_url: "0",
        recipients: [
          {
            mobiles: "91" + phone,
            OTP: otp, // must match template variable name
          },
        ],
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response.data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
