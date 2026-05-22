import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "User Not Found" }, { status: 400 });
  }

  const res = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return NextResponse.json({
    verified: res?.phoneVerified ?? false,
  });
}
