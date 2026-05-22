"use client";

import { Circle, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const containerStyle = {
  width: "100%",
  height: "800px",
};

interface Maplat {
  lat: number;
  log: number;
}

export const MapShowerAlso = ({ lat, log }: Maplat) => {
  const [radius, setRadius] = useState(100);
  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => (prev > 800 ? 100 : prev + 15));
    }, 80);

    return () => clearInterval(interval);
  }, []);


    
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

   const customMarkerIcon = useMemo(() => {
     if (!isLoaded || typeof window === "undefined" || !window.google)
       return null;

     return {
       url:
         "data:image/svg+xml;charset=UTF-8," +
         encodeURIComponent(`
      <svg width="70" height="80" viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 75 L28 58 L42 58 Z" fill="black"/>
        <circle cx="35" cy="37" r="30" fill="black"/>
        <path d="M27 37 L35 29 L43 37 V46 H38 V40 H32 V46 H27 Z" fill="white"/>
      </svg>
    `),
       scaledSize: new window.google.maps.Size(55, 65),
       anchor: new window.google.maps.Point(27.5, 65),
     };
   }, [isLoaded]);

  // Prevent invalid coordinates
  if (!Number.isFinite(lat) || !Number.isFinite(log)) {
    return <p className="px-6">Loading map...</p>;
  }

  const center = {
    lat: Number(lat),
    lng: Number(log),
  };
 
  
 

  if (!isLoaded) {
    return (
      <div className="px-6 py-6">
        <Skeleton className="h-[40px] w-[200px] mb-4 rounded-xl" />

        <div className="w-full rounded-3xl overflow-hidden shadow-lg">
          <Skeleton className="w-full h-[800px] rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <>
  

      <div className="lg:px-6 py-6">
        <div className="w-full rounded-3xl sticky overflow-hidden shadow-lg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={{
              disableDefaultUI: true,
              streetViewControl: true,
              fullscreenControl: true,
              gestureHandling: "greedy",
            }}
          >
            {customMarkerIcon && (
              <>
                {/* Marker */}
                <Marker
                  position={{ lat: center.lat, lng: center.lng }}
                  icon={customMarkerIcon}
                />

                {/* Radar circle 1 (outer pulse) */}
                <Circle
                  center={center}
                  radius={radius}
                  options={{
                    fillColor: "#3b82f6",
                    fillOpacity: 0.15,
                    strokeColor: "#3b82f6",
                    strokeOpacity: 0.4,
                    strokeWeight: 2,
                  }}
                />

                {/* Radar circle 2 (delayed pulse for ripple effect) */}
                <Circle
                  center={center}
                  radius={radius / 2}
                  options={{
                    fillColor: "#3b82f6",
                    fillOpacity: 0.25,
                    strokeOpacity: 0,
                  }}
                />

                {/* Inner fixed glow */}
                <Circle
                  center={center}
                  radius={60}
                  options={{
                    fillColor: "#3b82f6",
                    fillOpacity: 0.35,
                    strokeOpacity: 0,
                  }}
                />
              </>
            )}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};
