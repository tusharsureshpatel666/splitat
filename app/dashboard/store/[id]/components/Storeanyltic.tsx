"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import axios from "axios";
import { useParams } from "next/navigation";
import PlacesList from "./Placelist";
import NearbyStores from "./Loaction";

const Storeanyltic = () => {
  const [open, setOpen] = useState(false);
  const [nearbyResults, setNearbyResults] = useState([]); // ✅ ADD STATE
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const storeid = params?.id;
  console.log(nearbyResults)

  useEffect(() => {
    if (!storeid) return;

    const loadData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get store location
        const locationRes = await axios.get("/api/getlatlog", {
          params: { storeid },
        });

        const lat = locationRes.data.latitude;
        const lng = locationRes.data.longitude;

        // 2️⃣ Get user business type
        const userRes = await axios.get("/api/getuserId");

        // 3️⃣ Get AI place types
        const aiRes = await axios.post("/api/bussinesstypeai", {
          businessType: userRes.data.userBussinessType,
        });

        const placeTypes = aiRes.data.places;

        // 4️⃣ Fetch nearby places
        const results = [];

        for (const type of placeTypes) {
          const res = await axios.get("/api/nearbyplaces", {
            params: { lat, lng, type },
          });

          results.push({
            type,
            results: res.data.results || [],
          });
        }

        // ✅ SAVE TO STATE
        setNearbyResults(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storeid]);

  return (
    <>
      {/* Floating Button */}
      <div className="hidden lg:flex">
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="px-5 py-3 rounded-full flex items-center gap-2"
        >
          <FaChartLine />
          Analytics
        </Button>
      </div>

      {/* Full Screen Modal */}
      {open && (
        <div className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center">
          <div className="dark:bg-black bg-white text-black dark:text-white w-full h-full p-6 relative overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 cursor-pointer text-xl"
            >
              <IoClose />
            </button>

            <h1 className="text-2xl font-bold mb-6">Store Analytics</h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
               
              </div>
              {/* Nearby Places */}

              <div className="p-4 border rounded-lg">
                {loading ? (
                  <p>Loading nearby places...</p>
                ) : (
                  <PlacesList data={nearbyResults} />
                )}
              </div>

              <div className="p-4 border rounded-lg">Revenue Estimate</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Storeanyltic;
