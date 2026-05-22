import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { reason, message, id } = await req.json();

  try {
    if (!reason || !id) {
      return NextResponse.json({ error: "Not Found" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🚨 New Report Submitted",
      html: `
           <h2>New Report</h2>
           <p><strong>Reason:</strong> ${reason}</p>
           <p><strong>Message:</strong> ${message}</p>
           <p><strong>ID:</strong> ${id.id}</p>
         `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
