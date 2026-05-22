export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const types = searchParams.getAll("type");

  const requests = types.map((type) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=300&type=${type}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => ({
        type,
        results: (data.results || []).map((place: any) => ({
          place_id: place.place_id,
          name: place.name,
          vicinity: place.vicinity,

          // ✅ extract lat/lng
          lat: place.geometry?.location?.lat,
          lng: place.geometry?.location?.lng,

          // ✅ keep icons
          icon: place.icon,
          icon_mask_base_uri: place.icon_mask_base_uri,
          icon_background_color: place.icon_background_color,
        })),
      }));
  });

  const responses = await Promise.all(requests);

  const groupedResults: any = {};

  responses.forEach(({ type, results }) => {
    groupedResults[type] = results;
  });

  return Response.json({
    types,
    groupedResults,
  });
}
