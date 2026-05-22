"use client";

import React from "react";
import { Users, Briefcase, Target, Sparkles } from "lucide-react";

interface PeopleProps {
  idealBusinessName?: string;
  description?: string;
  requirements?: string[];
}

const People = ({
  description = "We are looking for a complementary business that aligns with our cake customers and enhances the overall store experience.",
  requirements = [
    "Clean and professional setup",
    "Customer-focused service",
    "Non-competing product category",
    "Willing to collaborate on promotions",
  ],
}: PeopleProps) => {
  return (
    <div
      className="border rounded-2xl p-6 shadow-md 
                 bg-white dark:bg-black
                 border-gray-200 dark:border-gray-700
                 space-y-4 hover:shadow-lg transition"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Users className="text-blue-600 dark:text-blue-400" size={22} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Ideal Partner
          </p>
        </div>
      </div>

      {/* Description */}
      <div
        className="bg-gray-50 dark:bg-gray-800 
                   border border-gray-200 dark:border-gray-700 
                   rounded-xl p-4"
      >
        <div className="flex items-start gap-2">
          <Target
            size={16}
            className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0"
          />

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed min-w-0 break-words">
            {description}
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Briefcase size={16} className="text-blue-500 dark:text-blue-400" />
          Partner Expectations
        </div>

        <ul className="space-y-2">
          {requirements.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm 
                         bg-blue-50 dark:bg-blue-900/30 
                         border border-blue-200 dark:border-blue-800 
                         text-gray-700 dark:text-gray-200
                         rounded-lg px-3 py-2"
            >
              <Sparkles
                size={14}
                className="text-blue-500 dark:text-blue-400"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlight */}
      <div
        className="bg-blue-50 dark:bg-blue-900/30 
                   border border-blue-200 dark:border-blue-800 
                   rounded-xl p-4 text-center"
      >
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Let’s build something valuable together and grow both businesses.
        </p>
      </div>
    </div>
  );
};

export default People;
