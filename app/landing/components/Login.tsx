"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Heading from "@/app/dashboard/components/heading";

const SplitatAuthSection = () => {
  const router = useRouter();

  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight">
              Log in to manage your <br className="hidden sm:block" /> Splitat
              account
            </h1>

            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
              Access your shared services, manage subscriptions, track expenses,
              and discover smarter ways to split costs.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto px-6 py-5 text-sm sm:text-base"
              >
                Log in to Splitat
              </Button>

              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                className="w-full sm:w-auto px-6 py-5 text-sm sm:text-base"
              >
                Create an account
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center w-full">
            <div className="bg-gray-100 dark:bg-zinc-900 rounded-xl p-4 sm:p-6 w-full max-w-md">
              <Image
                src="/begin.svg"
                alt="Splitat users"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitatAuthSection;
