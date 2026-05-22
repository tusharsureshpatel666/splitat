"use client";

import React from "react";
import { Store, BadgeCheck, Info } from "lucide-react";

interface OwnerDescProps {
  businessName: string;
  ownerName?: string;
  description?: string;
}

const OwnerDesc = ({
  businessName,
  ownerName,
  description,
}: OwnerDescProps) => {
  return (
    <div
      className="border rounded-2xl p-6 shadow-md 
                 bg-white dark:bg-black
                 border-gray-200 dark:border-gray-700
                 space-y-4 hover:shadow-lg transition"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
          <Store className="text-pink-600 dark:text-pink-400" size={22} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Store Owner
          </p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {businessName}
          </h2>
        </div>
      </div>

      {/* Owner Name */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <BadgeCheck size={16} className="text-green-500 dark:text-green-400" />
        Managed by{" "}
        <span className="font-medium capitalize text-gray-800 dark:text-gray-100">
          {ownerName}
        </span>
      </div>

      {/* Description */}
      <div
        className="bg-gray-50 dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 
                   rounded-xl p-4"
      >
        <div className="flex items-start gap-2">
          <Info size={16} className="text-gray-500 dark:text-gray-400 mt-1" />
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Highlight Message */}
      <div
        className="bg-pink-50 dark:bg-pink-900/30 
                   border border-pink-200 dark:border-pink-800 
                   rounded-xl p-4 text-center"
      >
        <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
          Looking for a complementary business to collaborate and grow together.
        </p>
      </div>
    </div>
  );
};

export default OwnerDesc;
