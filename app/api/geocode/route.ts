import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address } = await req.json();

  if (!address) {
    return NextResponse.json({ error: "Address missing" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  const location = data.results[0].geometry.location;

  return NextResponse.json({
    lat: location.lat,
    lng: location.lng,
  });
}
