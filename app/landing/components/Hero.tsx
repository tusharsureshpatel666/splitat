"use client";

import Image from "next/image";
import { Home, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Hero() {
  const router = useRouter();
  const { theme } = useTheme();

  // ✅ Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 👇 fallback image BEFORE theme loads
  const imageSrc = mounted
    ? theme === "dark"
      ? "/helo.webp"
      : "/dark1.webp"
    : "/dark1.webp"; // default

  // ✅ Only ONE image source


  return (
    <section className="w-full bg-white dark:bg-transparent">
      <div className="mx-auto justify-center flex max-w-7xl flex-col items-center gap-10 md:px-6 py-16 lg:flex-row">
        {/* LEFT CONTENT */}
        <div className="order-1 w-full space-y-6 lg:order-1 lg:w-1/2">
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            Delhi NCR, IN
          </p>

          <h1 className="text-2xl font-semibold leading-snug text-black dark:text-gray-50 sm:text-5xl">
            Connect with Store Partners with Splitat
          </h1>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size={"lg"}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-black dark:text-white"
              onClick={() => router.push("/dashboard")}
            >
              <Search size={16} />
              Search Partner
            </Button>

            <Button
              size={"lg"}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
              onClick={() => router.push("/dashboard")}
            >
              <Home size={16} />
              Add Your Store
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            * Splitat connects users with verified store partners and enables
            businesses to list, manage, and grow their stores efficiently.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-2 w-full lg:order-2 lg:w-1/2">
          <div className="relative overflow-hidden rounded-3xl">
            {/* ✅ Single Optimized Image */}
            <Image
              src={imageSrc}
              alt="Hero illustration"
              width={600}
              height={600}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="
                w-full object-cover
                h-[500px]
                sm:h-[500px]
                md:h-[600px]
                lg:h-full
              "
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 p-4 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium text-xs md:text-sm">
                  Search Partner Now?
                </p>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="cursor-pointer text-xs rounded-full bg-white dark:bg-white px-4 py-2 md:text-sm font-semibold text-black"
                >
                  Schedule ahead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
