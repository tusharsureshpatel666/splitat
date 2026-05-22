
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userid = await auth()
  
  

  const user = await prisma.user.findUnique({
    where: { id: userid?.user?.id },
    select: { phone: true },
  });

  return NextResponse.json({ phone: user?.phone });
}
