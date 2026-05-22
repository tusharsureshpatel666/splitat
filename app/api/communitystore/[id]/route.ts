import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { id } = await params;

    const session = await auth()

    // ✅ 🔥 VALIDATION START
    if (!body.title || body.title.trim() === "") {
      return new Response("Title is required", { status: 400 });
    }

    if (!body.desc || body.desc.trim() === "") {
      return new Response("Description is required", { status: 400 });
    }
    // ✅ 🔥 VALIDATION END

    const updated = await prisma.communityStore.update({
      where: { id },
      data: {
        startTime: body.startTime,
        endTime: body.endTime,
        days: body.days,
        sqft: body.sqft,
        dayOrNight: body.dayOrNight,
      },
    });

    const newStore = await prisma.store.create({
      data: {
        ownerId: session?.user?.id,

        title: body.title,
        desc: body.desc,
        peopleDesc: body.peopleDesc,

        flatno: body.flatno,
        streetAddress: body.streetAddress,
        NearbyLandMark: body.NearbyLandMark,
        areaLocality: body.areaLocality,

        storeSize: body.storeSize,
        businessType: body.businessType,
        shareMode: body.shareMode,
        country: body.country,
        state: body.state,
        city: body.city,
        pin: body.pin,
        fullAddress: body.fullAddress,

        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,

        bannerImageUrl: body.bannerImageUrl ?? null,

        priceInr: body.priceInr,

        startTime: body.startTime ?? null,
        endTime: body.endTime ?? null,
        days: body.days ?? [],
        sqft: body.sqft ?? null,
        dayOrNight: body.dayOrNight ?? null,

        images: body.images?.length
          ? {
              create: body.images.map((img: any) => ({
                url: img.url, // ✅ correct path
              })),
            }
          : undefined,
      },
    });

    return Response.json({
      success: true,
      community: updated,
      store: newStore,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);
    return new Response(error.message, { status: 500 });
  }
}
