import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  await prisma.userPresence.update({
    where: { userId: session.user.id },
    data: { conversationId: null },
  });

  await pusherServer.trigger("presence-global", "user-offine", {
    userId: session.user.id,
  });
  return NextResponse.json({ ok: true });
}
