type Address = {
  flat: string;
  street: string;
  nearby: string;
  district: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  address: string;
};

export const getLatLng = async (
  address: Address,
): Promise<{ lat: number; lng: number }> => {
  const fullAddress = `${address.flat}, ${address.street}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}, ${address.country} ${address.address}`;

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      fullAddress,
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );

  const data = await res.json();

  if (data.status === "OK") {
    const location = data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  }

  throw new Error("Address not found");
};
