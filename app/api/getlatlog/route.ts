import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("storeid");

    console.log(id, "id");

    const res = await prisma.store.findUnique({
      where: { id: String(id) },
      select: {
        latitude: true,
        longitude: true,
      },
    });

    return Response.json(res);
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
