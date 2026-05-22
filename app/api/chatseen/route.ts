import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const unseenCounts = await prisma.message.groupBy({
    by: ["conversationId"],
    where: {
      seen: false,
      senderId: { not: session.user.id },
      conversation: {
        OR: [
          {
            buyerId: session.user.id,
          },
          {
            store: {
              ownerId: session.user.id,
            },
          },
        ],
      },
    },
    _count: {
      conversationId: true,
    },
  });

  // convert to map format
  const result: Record<string, number> = {};

  unseenCounts.forEach((item) => {
    result[item.conversationId] = item._count.conversationId;
  });

  return NextResponse.json(result);
}
