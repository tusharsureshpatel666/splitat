import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  await prisma.notification.update({
    where: { id: params.id },
    data: { isRead: true },
  });

  return Response.json({ success: true });
}
