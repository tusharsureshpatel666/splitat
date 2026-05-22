import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json([], { status: 401 });
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { buyerId: userId }, // buyer
        {
          store: {
            ownerId: userId, // store owner
          },
        },
      ],
    },
    include: {
      buyer: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      store: {
        select: {
          id: true,
          title: true,
          bannerImageUrl: true,
          ownerId: true,
        },
      },
      messages: {
        where: {
          seen: false,
        },
        orderBy: { createdAt: "desc" },
        take: 1, // last message only
      },
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  });

  return NextResponse.json(conversations);
}
