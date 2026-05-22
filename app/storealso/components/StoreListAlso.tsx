import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StoreListAlso = ({ lat, log }) => {
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Get types
  useEffect(() => {
    const handleList = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");
        setTypes(res.data.places || []);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };
    handleList();
  }, []);

  // 🔹 Fetch nearby places
  useEffect(() => {
    const fetchNearby = async () => {
      if (!lat || !log || types.length === 0) return;

      try {
        setLoading(true);

        const query = new URLSearchParams({
          lat,
          lng: log,
        });

        types.forEach((type) => {
          query.append("type", type);
        });

        const res = await axios.get(`/api/nearbyplaces?${query.toString()}`);
        setPlaces(res.data.groupedResults || {});
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [lat, log, types]);

  return (
    <div className="md:px-6 px-3 py-6   min-h-screen">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Nearest Market</h1>

      {/* 🔥 Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading &&
        Object.keys(places)
          .filter((type) => places[type]?.length > 0)
          .map((type) => (
            <div key={type} className="mb-12">
              {/* 🔹 Section Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold capitalize">
                  {type.replaceAll("_", " ")}
                </h2>
                <span className="text-sm text-gray-500">
                  {places[type].length} places
                </span>
              </div>

              {/* 🔥 GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {places[type].map((place) => (
                  <div
                    key={place.place_id}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
                      )
                    }
                    className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  >
                    {/* 🔹 Top Row */}
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition"
                        style={{
                          backgroundColor:
                            place.icon_background_color || "#f3f4f6",
                        }}
                      >
                        <Image
                          width={40}
                          height={40}
                          src={
                            place.icon_mask_base_uri
                              ? `${place.icon_mask_base_uri}.png`
                              : place.icon
                          }
                          alt={place.name}
                          className="w-6 h-6"
                        />
                      </div>

                      {/* 🔹 Info */}
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-1">
                          {place.name}
                        </p>

                        <p className="text-xs text-gray-500 line-clamp-2">
                          {place.vicinity}
                        </p>
                      </div>
                    </div>

                    {/* 🔹 Bottom Row */}
                    <div className="flex items-center justify-between mt-3 text-xs">
                      {/* ⭐ Rating */}
                      {place.rating && (
                        <span className="text-yellow-500 font-medium">
                          ⭐ {place.rating}
                        </span>
                      )}

                      {/* 🟢 Open status */}
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
            </div>
          ))}

      {/* 🔥 Empty State */}
      {!loading &&
        Object.keys(places).length > 0 &&
        Object.values(places).every((arr) => arr.length === 0) && (
          <p className="text-center text-gray-500 py-10">
            No places found nearby
          </p>
        )}
    </div>
  );
};

export default StoreListAlso;
