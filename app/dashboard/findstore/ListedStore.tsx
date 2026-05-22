"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { StoreCardSkeleton } from "../store/[id]/components/storeSkeleton";
import { Heart } from "lucide-react";

const STORES_CARD_QUERY = gql`
  query StoresCard {
    stores {
      id
      title
      bannerImageUrl
      priceInr
      shareMode
    }
  }
`;

const ListedStore = () => {
  const { data, loading, error } = useQuery(STORES_CARD_QUERY);
  const formatShareMode = (mode: string) =>
    mode
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  console.log(data);
  // const { data: session } = useSession();

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

  if (error) return <p>Error loading stores</p>;

  return (
    <div className="mx-auto max-w-7xl lg:px-4 px-0 py-1 lg:py-8">
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.stores?.map((item: any) => (
          <Link
            href={`/dashboard/store/${item.id}`}
            key={item.id}
            className="group cursor-pointer mb-4"
          >
            {/* IMAGE CONTAINER */}
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                width={500}
                height={500}
                src={item.bannerImageUrl || "/placeholder.jpg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Guest Favourite Badge */}

              {/* Share Type Badge */}
              {item.shareMode && (
                <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {formatShareMode(item.shareMode)}
                </div>
              )}

              {/* Heart Icon */}
            </div>

            {/* CONTENT */}
            <div className="mt-3 space-y-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
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

export default ListedStore;

