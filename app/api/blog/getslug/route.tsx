import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug } = body;

  const data = await prisma.blog.findUnique({
    where: { slug },
  });

  return NextResponse.json(data);
}
