import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { status } = await req.json();
  const { id } = await params;

  const appointment = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json({
    success: true,
    data: appointment,
  });
}
