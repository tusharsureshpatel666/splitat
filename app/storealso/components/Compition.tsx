import axios from "axios";
import React, { useEffect, useState } from "react";

interface Comp {
  lat: number;
  lng: number;
  bussinessType: string;
}

interface Place {
  name: string;
  vicinity: string;
  rating?: number;
}

const Compition = ({ lat, lng, bussinessType }: Comp) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.post("/api/comp", {
          
            lat,
            lng,
            bussinessType,
          
        });
        const data = response.data
      
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [lat, lng, bussinessType]);

  return (
    <div>
      <h2>Nearby {bussinessType}</h2>

      {places.length === 0 ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place, index) => (
            <div
              key={index}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                )
              }
              className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              {/* 🔹 Top */}
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg">
                  📍
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold text-sm line-clamp-1">
                    {place.name}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {place.vicinity}
                  </p>
                </div>
              </div>

              {/* 🔹 Bottom */}
              <div className="flex items-center justify-between mt-3 text-xs">
                {/* Rating */}
                <span className="text-yellow-500 font-medium">
                  ⭐ {place.rating || "No rating"}
                </span>

                {/* Open/Closed */}
                {place.opening_hours && (
                  <span
                    className={`font-medium ${
                      place.opening_hours.open_now
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {place.opening_hours.open_now ? "Open" : "Closed"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compition;