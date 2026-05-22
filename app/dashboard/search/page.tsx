"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StoreCard from "../storeCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaBackward } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function SearchPage() {
  const params = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lng) return;

    setLoading(true);

    fetch("/api/store/nearby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: Number(lat),
        lng: Number(lng),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
      })
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return (
    <div className="w-full">
      <Link
        href={"/dashboard"}
        className="flex justify-between mb-9 items-center"
      >
        <Button variant={"outline"}>
          <FaBackward /> Back
        </Button>
        <h2 className="text-lg font-semibold">Nearest Store</h2>
      </Link>

      {/* 🔄 Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* ❌ Empty State */}
      {!loading && stores.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <Image
            src="/notfound.svg" // 👈 add this image in public folder
            alt="No stores"
            width={200}
            height={200}
            className="opacity-80"
          />
          <h3 className="text-lg font-semibold mt-4">
            No stores found nearby 😕
          </h3>
          <p className="text-gray-500 mt-2">
            Try searching a different location
          </p>
        </div>
      )}

      {/* ✅ Store List */}
      {!loading && stores.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}
