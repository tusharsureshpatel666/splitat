"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { IoFootsteps } from "react-icons/io5";

const FootfallListAlso = ({ lat, log }) => {
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 FOOTFALL CALCULATION
  const calculateFootfall = (places) => {
    const weights = {
      shopping_mall: 10,
      restaurant: 8,
      cafe: 7,
      school: 6,
      hospital: 6,
      supermarket: 7,
      gym: 5,
      bank: 5,
      atm: 4,
      store: 4,
    };

    let score = 0;

    Object.keys(places).forEach((type) => {
      const list = places[type] || [];
      const weight = weights[type] || 3;

      list.forEach((place) => {
        score += weight;

        if (place.rating) score += place.rating * 2;
        if (place.opening_hours?.open_now) score += 2;
      });
    });

    return Math.min(100, Math.round(score));
  };

  const footfallScore = calculateFootfall(places);

  // 🔥 SCORE META
  const getFootfallMeta = (score) => {
    if (score >= 70)
      return {
        label: "High Footfall",
        color: "text-green-600",
        bg: "bg-green-100",
        bar: "bg-green-500",
      };
    if (score >= 40)
      return {
        label: "Medium Footfall",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        bar: "bg-yellow-500",
      };
    return {
      label: "Low Footfall",
      color: "text-red-600",
      bg: "bg-red-100",
      bar: "bg-red-500",
    };
  };

  const meta = getFootfallMeta(footfallScore);

  // 🔹 Get types
  useEffect(() => {
    const handleList = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");
        setTypes(res.data.places || []);
      } catch (err) {
        console.error(err);
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

        types.forEach((type) => query.append("type", type));

        const res = await axios.get(`/api/nearbyplaces?${query}`);
        setPlaces(res.data.groupedResults || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [lat, log, types]);

  return (
    <div className="p-4 md:p-6    flex items-center justify-center">
        
      {/* 🔥 MAIN CARD */}
      <div className="bg-white dark:bg-[#111] rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-sm max-w-2xl w-full text-center">
        {loading ? (
          <div className="h-40 animate-pulse bg-gray-200 rounded-2xl" />
        ) : (
          <>

          <IoFootsteps/>
            {/* 🔹 Title */}
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">
              Footfall Score
            </p>

            {/* 🔥 BIG COUNTER */}
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight">
              <CountUp end={footfallScore} duration={1.5} />
              <span className="text-lg md:text-2xl text-gray-400 ml-2">
                /100
              </span>
            </h2>

            {/* 🔹 Badge */}
            <div className="mt-4 flex justify-center">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${meta.bg} ${meta.color}`}
              >
                {meta.label}
              </span>
            </div>

            {/* 🔹 Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-6">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${meta.bar}`}
                style={{ width: `${footfallScore}%` }}
              />
            </div>

            {/* 🔹 Explanation */}
            <p className="text-sm text-gray-500 mt-5 max-w-md mx-auto">
              {footfallScore >= 70 &&
                "High traffic area. Ideal for business growth and visibility."}

              {footfallScore >= 40 &&
                footfallScore < 70 &&
                "Moderate activity. Works well for targeted or niche businesses."}

              {footfallScore < 40 &&
                "Low foot traffic. Consider demand or marketing strategies carefully."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FootfallListAlso;
