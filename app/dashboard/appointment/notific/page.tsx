"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../../components/heading";
import { Calendar, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Notification {
  id: string;
  Date: string;
  selectTime: string;
  status: string;
  UserPhoto: string;
  user: {
    id: string;
    name: string;
    image: string | null;
    phone: string;
  };
  store: {
    id: string;
    title: string;
    bannerImageUrl: string | null;
  };
}

const NotificationPage = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/appoint/notific");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      await axios.patch(`/api/appoint/notific/${id}`, {
        status,
      });

      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl w-full mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm space-y-4"
            >
              <Skeleton className="h-44 w-full rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No new appointment requests.
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <Heading
        title="📅 Appointment Requests"
        description="Review and manage customer appointment requests."
        className="mb-5"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative border rounded-xl p-4 shadow-sm hover:shadow-md transition "
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : item.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {item.status === "PENDING"
                  ? "🟡 New"
                  : item.status === "APPROVED"
                    ? "🟢 Accepted"
                    : "🔴 Rejected"}
              </span>
            </div>

            <Image
              src={item.store.bannerImageUrl || "/placeholder.png"}
              alt={item.store.title}
              width={400}
              height={200}
              className="w-full h-44 rounded-lg object-cover"
            />

            <div className="mt-4">
              <h2 className="font-semibold text-lg">
                {item.user.name} requested an appointment
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Store: {item.store.title}
              </p>
            </div>
            <Link href={`/dashboard/appointment/${item.id}`}>
              <Button
                className="w-full py-4 mt-5"
                size="lg"
                variant="secondary"
              >
                <View /> View Full Request
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
