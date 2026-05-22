"use client";
import Heading from "@/app/dashboard/components/heading";
import { useParticStore } from "@/store/store";
import { PARTIC_OPTIONS } from "@/type/Partition";
import { ParticOption } from "@/type/Partitiontype";
import Image from "next/image";
import React, { useState } from "react";

const StepPartic = () => {
  const { share, setMode, updateShare } = useParticStore();
  const { mode } = share;

  return (
    <div className="space-y-6 w-full">
      <Heading
        title="Select Your Store Sharing Method"
        description="Decide how you want to share your store and make it accessible to your audience."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {PARTIC_OPTIONS.map((item) => {
          const isActive = mode === item.value;

          return (
            <button
              key={item.value}
              onClick={() => setMode(item.value)}
              className={`p-5 border rounded-xl text-left transition-all ${
                isActive
                  ? "border-blue-500 "
                  : "border-gray-300 hover:border-blue-400 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                />

                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.value}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepPartic;
