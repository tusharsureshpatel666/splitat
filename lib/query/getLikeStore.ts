import { auth } from "@/lib/auth";
import prisma from "../prisma";

export async function getLikedStores() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.storeLike.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      store: true, // 👈 full store data
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
