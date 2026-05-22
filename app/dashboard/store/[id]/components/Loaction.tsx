"use client";

import { getUserLocationCached } from "@/lib/getUserLocation";
import { useEffect, useState } from "react";

type Location = {
  lat: number;
  lng: number;
};

export default function NearbyStores() {
  const [location, setLocation] = useState<Location | null>(null);
  console.log(location);

  useEffect(() => {
    getUserLocationCached()
      .then((loc) => {
        setLocation(loc);
      })
      .catch(() => {
        // user denied or error
        console.log("Location access denied");
      });
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Your location: {location.lat}, {location.lng}
        </p>
      ) : (
        <p>Detecting location...</p>
      )}
    </div>
  );
}
