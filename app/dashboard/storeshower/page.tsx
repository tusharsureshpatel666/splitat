"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreCardSkeleton } from "../store/[id]/components/storeSkeleton";
import axios from "axios";

const ListedStoreComm = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatShareMode = (mode: string) =>
    mode
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("/api/getstoreshower")
        const data = await res.data;

        setStores(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-0 lg:px-4 py-8">
        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto max-w-7xl lg:px-4 px-0 py-8">
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stores?.map((item: any) => (
          <Link
            href={`/dashboard/communitystore/${item.id}`}
            key={item.id}
            className="group cursor-pointer mb-4"
          >
            {/* IMAGE */}
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                width={500}
                height={500}
                src={item.bannerImageUrl || "/placeholder.jpg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Share Mode */}
              {item.shareMode && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {formatShareMode(item.shareMode)}
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="mt-3 space-y-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {item.title}
              </h3>

              <p className="text-sm font-medium text-gray-900 dark:text-white">
                ₹{item.priceInr}
                <span className="text-gray-500 font-normal"> / month</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListedStoreComm;
