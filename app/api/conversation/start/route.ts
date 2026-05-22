import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { storeId } = await req.json();
  const userId = session.user.id;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: { id: true, ownerId: true },
  });

  if (!store) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  let conversation = await prisma.conversation.findUnique({
    where: {
      storeId_buyerId: {
        storeId,
        buyerId: userId,
      },
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        storeId,
        buyerId: userId,
      },
    });
  }

  return NextResponse.json(conversation);
}
