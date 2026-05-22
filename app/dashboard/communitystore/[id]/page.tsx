"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MobileImageSlider } from "../../store/[id]/components/MobileNav";
import { DesktopImageGrid } from "../../store/[id]/components/Desktopgrid";
import { Button } from "@/components/ui/button";
import CommunityShareStore from "../components/CommunityStoreShare";
import Heading from "../../components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import People from "../../store/[id]/components/people";
import LocationMap from "../../store/[id]/components/MapShower";
import { Search } from "lucide-react";
import Link from "next/link";import {
  FiUsers,
  FiTag,
  FiPercent,
  FiTrendingDown,
  FiSearch,
} from "react-icons/fi";
import { FaChartArea } from "react-icons/fa";

const CommunityStore = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/getCommunityStore", {
          params: { id },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 🔹 Skeleton Loader
  if (loading) {
    return (
      <div className="w-full space-y-4 px-2 md:px-0">
        <div className="flex pb-5 gap-4 justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Skeleton className="w-full h-[250px] rounded-xl" />

        <div className="hidden md:grid grid-cols-3 gap-4">
          <Skeleton className="col-span-2 h-[300px] rounded-xl" />
          <div className="grid gap-4">
            <Skeleton className="h-[145px] rounded-xl" />
            <Skeleton className="h-[145px] rounded-xl" />
          </div>
        </div>

        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    );
  }

  const allImages = [
    data?.bannerImageUrl,
    ...(data?.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6 pb-24 lg:pb-0 px-2 md:px-4 lg:px-0">
      {/* 🔹 Header */}
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold break-words">
          {data?.title}
        </h1>
        <CommunityShareStore paramsId={data?.id} />{" "}
        {/* <Link href={`/storealso/audience/${data.id}`}>
          <Button className="rounded-full" variant={"outline"}>
            <FaChartArea />
          </Button>
        </Link> */}
      </div>

      {/* 🔹 Mobile Slider */}
      <div className="block md:hidden">
        <MobileImageSlider images={allImages} />
      </div>

      {/* 🔹 Desktop Grid */}
      <div className="hidden md:block">
        <DesktopImageGrid
          banner={data?.bannerImageUrl || ""}
          images={data?.images?.map((img) => img.url) || []}
        />
      </div>

      {/* 🔹 Heading (VISIBLE ON ALL SCREENS) */}
      <Heading
        title={`${data?.storeSize?.replace(/store/i, "size")} in ${data?.city}`}
        className="mt-2"
      />

      {/* 🔹 Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* ✅ People Section */}
        <People description={data?.peopleDesc} />

        {/* ✅ Sidebar (Desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-2xl shadow-lg p-6 space-y-5 transition-all">
            {/* PRICE SECTION */}
            <div>
              {/* Anchor Price */}
              <div className="flex items-end gap-2 mt-1">
                <span className="text-4xl font-extrabold text-black dark:text-white">
                  ₹{data?.priceInr}
                </span>
                <span className="text-sm text-gray-500 mb-1">/month</span>
              </div>

              {/* SPLIT BOX */}
              <div className="mt-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <FiUsers className="w-4 h-4" />
                  Shared by 2 partners
                </div>

                <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                  <FiPercent className="w-4 h-4" />
                  You pay only ₹{(data?.priceInr / 2).toFixed(0)}/month
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600">
                  <FiTrendingDown className="w-4 h-4" />
                  You save ₹{(data?.priceInr / 2).toFixed(0)} every month
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Inclusive of all taxes
              </p>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* OFFERS */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-orange-500 flex items-center gap-2">
                <FiTrendingDown className="w-4 h-4" />
                Limited Offers
              </h3>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm">
                Cashback: Get 5% back on selected cards
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm">
                Bank Offer: Save up to 7.5% on EMI payments
              </div>
            </div>

            {/* CTA */}
            <Link href={`/dashboard/communitystore/findpartner/${id}`}>
              <Button className="w-full p-6 mb-4">
                <FiSearch className="w-5 h-5" />
                Find Your Partner
              </Button>
            </Link>

            {/* TRUST */}
            <p className="text-center text-xs text-gray-400">
              1000+ users already sharing stores
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Map (VISIBLE ON ALL SCREENS) */}
      <div className="mt-6">
        <LocationMap
          lat={data?.latitude}
          lng={data?.longitude}
          city={data?.city}
          state={data?.state}
        />
      </div>

      {/* 🔹 Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-12 left-0 right-0 border-t bg-white dark:bg-black px-4 py-3 z-20">
        <div className="flex items-center justify-between">
          {/* Psychological Pricing */}
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              ₹{Math.floor((data?.priceInr || 0) / 2)}
            </span>
            <span className="text-xs text-gray-500">
              only your half • shared rent
            </span>
          </div>

          {/* CTA */}
          <Link href={`/dashboard/communitystore/findpartner/${id}`}>
            <Button className="rounded-2xl px-4 py-2">
              <Search className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityStore;
