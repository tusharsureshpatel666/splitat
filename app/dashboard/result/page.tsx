"use client";

import { useStoreSearch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

const ResultPage = () => {
  const stores = useStoreSearch((state) => state.stores);

  console.log(stores.length);
  return (
    <Link href={`/dashboard/store`} className="grid gap-6">
      {stores.map((store) => (
        <div key={store.id} className="p-4 border rounded-lg">
          {/* Banner Image */}
          {store.bannerImageUrl && (
            <Image
              src={store.bannerImageUrl}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md"
              alt={store.title}
            />
          )}

          {/* Store Images */}
          {store.images?.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {store.images.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  width={200}
                  height={200}
                  className="w-full h-24 object-cover rounded"
                  alt="store image"
                />
              ))}
            </div>
          )}

          {/* Store Details */}
          <h2 className="mt-3 text-lg font-semibold">{store.title}</h2>
          <p className="text-sm text-gray-600">{store.desc}</p>
          <p className="text-sm">
            {store.city}, {store.state}
          </p>
          <p className="font-semibold mt-1">₹{store.priceInr}</p>
          <p className="font-semibold mt-1">₹{store.businessType}</p>
        </div>
      ))}
    </Link>
  );
};

export default ResultPage;
