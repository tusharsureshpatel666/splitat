"use client";

import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

type StoreLocationMapProps = {
  lat: Float16Array;
  lng: Float16Array;
  storeName?: string;
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function StoreLocationMap({
  lat,
  lng,
  storeName = "Store Location",
}: StoreLocationMapProps) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border bg-white shadow-sm">
      {/* Header (Airbnb style) */}
      <div className="px-4 py-3 border-b">
        <h3 className="text-base font-semibold text-gray-900">
          Where you’ll find us
        </h3>
        <p className="text-sm text-gray-500">Exact location on map</p>
      </div>

      {/* Map */}
      <div className="relative h-[260px] sm:h-[320px]">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={15}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              fullscreenControl: false,
              clickableIcons: false,
            }}
          >
            <Marker position={{ lat, lng }} title={storeName} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Footer info */}
      <div className="px-4 py-3 text-sm text-gray-600">
        Latitude: <span className="font-medium">{lat}</span> · Longitude:{" "}
        <span className="font-medium">{lng}</span>
      </div>
    </div>
  );
}
