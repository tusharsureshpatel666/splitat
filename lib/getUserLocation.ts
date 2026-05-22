// lib/location.ts
export async function getUserLocationCached() {
  if (typeof window === "undefined") {
    throw new Error("Client only");
  }

  const cached = sessionStorage.getItem("user_location");
  if (cached) {
    return JSON.parse(cached);
  }

  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        sessionStorage.setItem("user_location", JSON.stringify(location));
        resolve(location);
      },
      reject,
      { enableHighAccuracy: true }
    );
  });
}
