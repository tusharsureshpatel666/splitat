import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const unreadCount = await prisma.appointmentNotif.count({
      where: {
        receiverId: session.user.id,
        isRead: false,
        appointment: {
          status: "PENDING",
        },
      },
    });

    return NextResponse.json({
      unreadCount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ unreadCount: 0 }, { status: 500 });
  }
}
