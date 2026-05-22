import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const likedStores = await prisma.storeLike.findMany({
    where: { userId: session.user.id },
    select: {
      store: true,
    },
  });

  return NextResponse.json(likedStores);
}
