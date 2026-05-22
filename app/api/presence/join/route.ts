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

  await prisma.userPresence.upsert({
    where: { userId: session.user.id },
    update: {
      conversationId,
    },
    create: {
      userId: session.user.id,
      conversationId,
    },
  });

  await pusherServer.trigger("presence-global", "user-online", {
    userId: session.user.id,
  });
  return NextResponse.json({ ok: true });
}
