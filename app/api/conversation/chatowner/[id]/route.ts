import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
  const id = await params;
  console.log("id", id);
  const conversation = await prisma.conversation.findUnique({
    where: { id: id.id },
    include: {
      participants: {
        where: {
          role: "OWNER",
        },
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
    },
  });

  const owner = conversation?.participants[0]?.user;

  console.log(params.id);
  return NextResponse.json(owner);
}
