import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const count = await prisma.message.count({
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
  });

  return NextResponse.json({ count });
}
