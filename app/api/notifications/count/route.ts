import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  const count = await prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });

  return Response.json({ count });
}
