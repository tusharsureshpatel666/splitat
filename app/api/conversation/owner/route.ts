import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const conversation = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId,
          role: "OWNER",
        },
      },
    },
    include: {
      store: {
        select: {
          id: true,
          title: true,
          bannerImageUrl: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  });
  return NextResponse.json(conversation);
}
