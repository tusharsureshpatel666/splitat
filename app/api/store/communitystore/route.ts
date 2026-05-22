import { auth } from "@/lib/auth";
import { getLatLng } from "@/lib/Getlatlog";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
      const session = await auth();
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const ownerId = session.user.id

      const body = await req.json();
      const {
        title,
        desc,
        country,
        flat,
        street,
        nearby,
        district,
        state,
        city,
        pin,
        businessType,
        peopleDesc,
        storeSize,
        priceInr,
        bannerImageUrl,
        images,
        address,
      } = body;

      const { lat, lng } = await getLatLng({
        flat,
        street,
        nearby,
        district,
        city,
        state,
        pin,
        country,
        address
      });

      if (!title || !desc) {
        return NextResponse.json(
          { error: "Title and description required" },
          { status: 400 },
        );
      }
    

      if (!bannerImageUrl) {
        return NextResponse.json(
          { error: "Banner image missing" },
          { status: 400 },
        );
      }

      if (!Array.isArray(images) || images.length !== 4) {
        return NextResponse.json(
          { error: "Exactly 4 image URLs required" },
          { status: 400 },
        );
      }
      const total = priceInr * 1.1;

      const store = await prisma.communityStore.create({
        data: {
          ownerId,
          title,
          desc,
          peopleDesc,
          storeSize,
          businessType: "hello",
          country,
          state,
          city,
          pin,
          fullAddress: address,
          flatno: flat,
          streetAddress: street,
          NearbyLandMark: nearby,
          areaLocality: district,
          latitude: lat,
          longitude: lng,

          priceInr: total,
          bannerImageUrl,

          images: {
            createMany: {
              data: images.map((url: string, index: number) => ({
                url,
                order: index,
              })),
            },
          },
        },
        include: { images: true },
      });

      return NextResponse.json(
        { message: "Store created successfully", store },
        { status: 201 },
      );
    } catch (error) {
      console.error("Create store error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
    
}