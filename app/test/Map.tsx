"use client";

import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

type Props = {
  address: string;
  setAddress: (v: string) => void;
};

export default function SingleLocationInput({ address, setAddress }: Props) {
  const [loading, setLoading] = useState(false);

  // ✅ Load Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const getCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    if (!isLoaded) {
      alert("Google Maps API not loaded yet");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat, lng };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK" && results && results[0]) {
              setAddress(results[0].formatted_address); // ✅ Fill full address
            } else {
              alert("Unable to get address");
            }
            setLoading(false);
          });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Unable to get location");
        setLoading(false);
      },
    );
  };

  return (
    <div className="space-y-2 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border"
      />
      <button
        onClick={getCurrentAddress}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition flex justify-center"
      >
        {loading ? "Detecting..." : "Use My Current Location"}
      </button>
    </div>
  );
}
