"use client";

import Heading from "@/app/dashboard/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FaStore, FaBuilding, FaWarehouse } from "react-icons/fa";
import { IoMdCafe } from "react-icons/io";

type StoreType = {
  id: number;
  title: string;
  description: string;
  icon: IconType;
};

const storetype: StoreType[] = [
  {
    id: 1,
    title: "Small Store / Single Room",
    description: "Ideal for kirana, salon, mobile repair",
    icon: FaStore,
  },
  {
    id: 2,
    title: "Medium Store",
    description: "Suitable for café, boutique, coaching center",
    icon: IoMdCafe,
  },
  {
    id: 3,
    title: "Large Store / Showroom",
    description: "Best for restaurant, gym, electronics",
    icon: FaBuilding,
  },
  {
    id: 4,
    title: "Warehouse / Godown",
    description: "Used for storage, wholesale, logistics",
    icon: FaWarehouse,
  },
];

const StoreTypeGrid = () => {
  return (
    <div className="w-full  md:px-4 py-10">
      {/* Heading */}
      <Heading
        title="Explore what you can do with Splitat"
        className="mb-8 text-xs max-w-lg"
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {storetype.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-zinc-900 p-5 rounded-xl transition"
            >
              {/* Left Content */}
              <div className="space-y-2 max-w-[70%]">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                <Link href={"/dashboard"}>
                  <Button
                    variant={"outline"}
                    className="mt-2 px-4 py-1.5 text-sm rounded-full  transition"
                  >
                    Details
                  </Button>
                </Link>
              </div>

              {/* Icon */}
              <div className="text-5xl text-gray-700 dark:text-gray-300">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreTypeGrid;
