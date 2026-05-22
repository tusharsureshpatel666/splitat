"use client";

import { useState, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

interface LocationMapProps {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export default function LocationMap({
  lat,
  lng,
  city,
  state,
}: LocationMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [loading, setLoading] = useState(false);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [mapReady, setMapReady] = useState(false);

  // ✅ Custom Airbnb-style marker
  const customMarkerIcon = useMemo(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google)
      return undefined;

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="70" height="80" viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="black" flood-opacity="0.35"/>
            </filter>
          </defs>
          <path d="M35 75 L28 58 L42 58 Z" fill="black" />
          <circle cx="35" cy="37" r="30" fill="black" filter="url(#shadow)" />
          <path 
            d="M27 37 L35 29 L43 37 V46 H38 V40 H32 V46 H27 Z"
            fill="white"
          />
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(55, 65),
      anchor: new window.google.maps.Point(27.5, 65),
    };
  }, [isLoaded]);

  // 🚀 Get User Location + Directions
  const getUserLocation = useCallback(() => {
    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(origin);

          const directionsService = new window.google.maps.DirectionsService();

          const result = await directionsService.route({
            origin,
            destination: { lat, lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          });

          setDirections(result);
        } catch (error) {
          console.error("Directions error:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoading(false);
      },
    );
  }, [lat, lng]);

  // ⛔ Prevent rendering before script is ready
  if (!isLoaded) {
    return <Skeleton className="h-[550px] rounded-3xl" />;
  }

  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 transition duration-300 w-full">
      {/* Header */}
      <div className="flex flex-col px-6 pt-6">
        <h1 className="text-2xl font-semibold">Where you’ll be</h1>
        <h2 className="text-sm text-gray-500 font-medium">
          {city}, {state}
        </h2>
      </div>

      <div className="mt-4 px-1 md:px-4 pb-6 relative w-full">
        {/* 🚗 Get Directions Button */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="bg-black text-white px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition disabled:opacity-60 flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            Get Directions
          </button>
        </div>

        {/* Map Container */}
        <div className="h-[550px] w-full rounded-3xl overflow-hidden">
          <GoogleMap
            key="stable-map"
            onLoad={() => setMapReady(true)}
            center={{ lat, lng }}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              disableDefaultUI: true,
              streetViewControl: true,
              mapTypeControl: false,
              fullscreenControl: true,
              scrollwheel: true,
              gestureHandling: "auto",
            }}
          >
            {/* Store Marker */}
            {customMarkerIcon && (
              <Marker position={{ lat, lng }} icon={customMarkerIcon} />
            )}

            {/* User Marker */}
            {userLocation && <Marker position={userLocation} />}

            {/* Directions */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: "#2563eb",
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
