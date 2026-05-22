import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const store = await prisma.store.update({
    where: { id: params.id },
    data: {
      title: body.title,
      desc: body.desc,
      country: body.country,
      state: body.state,
      city: body.city,
      pin: body.pin,
      fullAddress: body.fullAddress,
      priceInr: Number(body.priceInr),
      businessType: body.businessType,
      bannerImageUrl: body.bannerImageUrl,
      latitude: body.latitude,
      longitude: body.longitude,
    },
  });

  return NextResponse.json(store);
}
