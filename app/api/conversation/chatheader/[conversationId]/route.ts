import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } },
) {
  const paramsId = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id: paramsId.conversationId },
    include: {
      buyer: {
        select: {
          id: true,
          name: true,
          image: true,
          phone: true,
          
        },
      },
      store: {
        select: {
          
          id: true,
          title: true,
          bannerImageUrl: true,
          ownerId: true,
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
               phone: true,
        
            },
          },
        },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = conversation.store.ownerId === userId;

  // 🔑 header logic
  const header = isOwner
    ? {
        id: conversation.store.id,
        name: conversation.store.title,
        image:
          conversation.store.bannerImageUrl || "/store-banner-fallback.png",
        phone: conversation.buyer.phone || "",
      }
    : {
        id: conversation.store.id,
        name: conversation.store.owner.name,
        image: conversation.store.owner.image || "/avatar.avif",
         phone: conversation.store.owner.phone || "",
      };

  return NextResponse.json(header);
}
