export async function POST(req: Request) {
  try {
    // 🔒 Hardcoded values (ignore body completely)

    const body = await req.json()
    const lat = body.lat;
    const lng = body.lng;
    const businessType = body.businessType;

    // const lat = 28.6139; // Delhi
    // const lng = 77.209;
    // const businessType = "restaurant";

    

    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    console.log("DEBUG INPUT:");
    console.log({ lat, lng, businessType, key: key ? "EXISTS" : "MISSING" });

    if (!key) {
      console.log("❌ API KEY MISSING");
      return new Response(JSON.stringify({ error: "Missing API key" }), {
        status: 400,
      });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${businessType}&key=${key}`;

    console.log("🌐 FETCH URL:");
    console.log(url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("📦 GOOGLE RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    if (!data.results) {
      console.log("❌ NO RESULTS");
      return new Response(JSON.stringify({ message: "No places found" }), {
        status: 404,
      });
    }

    console.log("✅ SUCCESS, places found:", data.results.length);

    return new Response(JSON.stringify(data.results), {
      status: 200,
    });
  } catch (error) {
    console.log("🔥 ERROR:");
    console.error(error);

    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
