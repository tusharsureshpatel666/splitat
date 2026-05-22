import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { conversationId } = await req.json();

  const updated = await prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: session.user.id },
      seen: false,
    },
    data: { seen: true },
  });

  await pusherServer.trigger(
    `conversation-${conversationId}`,
    "messages-seen",
    {
      conversationId,
      seenBy: session.user.id,
    },
  );

  return NextResponse.json({ success: true });
}
