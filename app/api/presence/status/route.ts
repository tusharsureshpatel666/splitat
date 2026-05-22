import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ online: false });
  }

  const presence = await prisma.userPresence.findUnique({
    where: { userId },
    select: {
      conversationId: true,
    },
  });

  return NextResponse.json({
    online: !!presence,
    inConversation: !!presence?.conversationId,
  });
}
