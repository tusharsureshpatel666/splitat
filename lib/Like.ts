"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function toggleStoreLike(storeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const existing = await prisma.storeLike.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });

  if (existing) {
    await prisma.storeLike.delete({
      where: { id: existing.id },
    });

    return { liked: false };
  }

  await prisma.storeLike.create({
    data: {
      userId,
      storeId,
    },
  });

  return { liked: true };
}
