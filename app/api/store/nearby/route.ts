// app/api/stores/nearby/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lat, lng } = await req.json();
  console.log(lat, lng);

  const stores = await prisma.$queryRaw`
    SELECT *
    FROM (
      SELECT *,
        (
          6371 * acos(
            cos(radians(${lat}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${lng}))
            + sin(radians(${lat}))
            * sin(radians(latitude))
          )
        ) AS distance
      FROM "Store"
    ) AS s
    WHERE distance <= 10
    ORDER BY distance ASC;
  `;

  return NextResponse.json(stores);
}
