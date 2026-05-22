import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher/server";

import { NextResponse } from "next/server";
import { send } from "process";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const senderId = session.user.id;

  const { conversationId, text } = await req.json();

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      text,
    },
    include: {
      conversation: {
        include: {
          store: true,
        },
      },
    },
  });

  const conversation = message.conversation;

  const recieverId =
    conversation.buyerId === senderId
      ? conversation.store.ownerId
      : conversation.buyerId;

  if (recieverId) {
    await prisma.notification.create({
      data: {
        userId: recieverId,
        conversationId,
        message: text,
      },
    });
  }

  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      lastMessageAt: new Date(),
    },
  });

  // const recieverId = senderId === conversation;

  await pusherServer.trigger(
    `conversation-${conversationId}`,
    "new-message",
    message,
  );
  await pusherServer.trigger(`notifications-${recieverId}`, "new-message", {
    messageId: message.id,
  });

  return NextResponse.json(message);
}
