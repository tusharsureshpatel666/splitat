"use client";

import { useState } from "react";
import SearchBox from "./components/Main";
import UserBussiness from "./components/userBussiness";
import ListedStore from "./findstore/ListedStore";
import ListedStoreComm from "./storeshower/page";
import { Store, Briefcase, Search } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <div className="w-full max-w-6xl mx-auto">
      <SearchBox />

      {/* Custom Tab Bar */}
      <div className="flex justify-around border-b mt-6 sm:h-[70px] h-[70px] md:h-[70px] lg:h-[70px]">
        {/* Stores Tab */}
        <button
          onClick={() => setActiveTab("stores")}
          className={`flex flex-col items-center justify-center cursor-pointer  w-full transition-all
            ${
              activeTab === "stores"
                ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            }`}
        >
          <Store className="w-5 h-5" />
          <span className=" text-xs lg:text-sm mt-1">Partner Stores</span>
        </button>

        {/* Business Tab */}
        <button
          onClick={() => setActiveTab("business")}
          className={`flex flex-col items-center justify-center cursor-pointer  w-full transition-all
            ${
              activeTab === "business"
                ? "border-b-2 border-black text-black dark:border-white dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-xs lg:text-sm  mt-1">Search Partner</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "stores" && (
          <>
            <ListedStore />
            <div className="mt-4">
              <UserBussiness />
            </div>
          </>
        )}

        {activeTab === "business" && <ListedStoreComm />}
      </div>
    </div>
  );
}
