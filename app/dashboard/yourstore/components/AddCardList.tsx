"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../../components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Loader,
  MapPin,
  Store as StoreIcon,
  IndianRupee,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";
import { error } from "console";

/* =========================
   STORE TYPE
========================= */
type Store = {
  id: string;
  title: string;
  businessType: string;
  city: string;
  state: string;
  country: string;
  priceInr: number;
  bannerImageUrl: string;
};

const AddCardList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Store[]>("/api/store/yourstore");
        console.log(res);
        setStores(res.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading your stores…</p>
      </div>
    );
  }

  /* =========================
     EMPTY
  ========================= */
  if (!stores.length) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <Image src="/not.svg" width={360} height={360} alt="No store" />
        <Heading
          title="No Store Found"
          description="You haven’t created any store yet."
        />
        <Link href="/dashboard/addstore">
          <Button size="lg" className="rounded-full px-10 py-6">
            Create Store
          </Button>
        </Link>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-8 w-full">
      <Heading
        title="Your Stores"
        description="Manage and view all your listed stores"
      />

      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <Link
              href={`/dashboard/store/${store.id}`}
              className="group cursor-pointer block mb-6"
            >
              {/* IMAGE */}
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={store.bannerImageUrl || "/placeholder.jpg"}
                  alt={store.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Optional badge example */}
                {/* {store.shareMode && (
                  <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {formatShareMode(store.shareMode)}
                  </div>
                )} */}
              </div>

              {/* CONTENT */}
              <div className="mt-3 space-y-1 px-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  {store.title}
                </h3>

                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹{store.priceInr}
                  <span className="text-gray-500 font-normal"> / month</span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddCardList;
