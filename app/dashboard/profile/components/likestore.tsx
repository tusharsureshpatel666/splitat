"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LikeStore = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get("/api/Loved");
        setData(res.data); // make sure your API returns { stores: [...] }
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-0 lg:px-4 py-8">
        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-3xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error loading liked stores</p>;

  if (!data?.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        You haven't liked any stores yet ❤️
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl lg:px-4 px-0 py-8">
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item: any) => (
          <Link
            href={`/dashboard/store/${item.store.id}`}
            key={item.store.id}
            className="group cursor-pointer mb-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                width={500}
                height={500}
                src={item.store.bannerImageUrl || "/placeholder.jpg"}
                alt={item.store.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {item.store.title}
              </h3>

              <p className="text-sm font-medium text-gray-900 dark:text-white">
                ₹{item.store.priceInr}
                <span className="text-gray-500 font-normal"> / month</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LikeStore;
