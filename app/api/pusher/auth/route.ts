import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.formData();

  const socketId = body.get("socket_id") as string;
  const channel = body.get("channel_name") as string;

  const presenceData = {
    user_id: session.user.id,
    user_info: { name: session.user.name },
  };

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channel,
    presenceData,
  );

  return NextResponse.json(authResponse);
}
