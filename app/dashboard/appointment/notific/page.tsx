"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Notification {
  id: string;
  Date: string;
  selectTime: string;
  status: string;
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
    return <div className="p-6">Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No new appointment requests.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-4 flex flex-col md:flex-row gap-4"
        >
          <Image
            src={item.store.bannerImageUrl || "/placeholder.png"}
            alt={item.store.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />

          <div className="flex-1">
            <h2 className="font-semibold text-lg">
              {item.user.name} requested an appointment
            </h2>

            <p className="text-sm text-gray-500">Store: {item.store.title}</p>

            <p className="text-sm">
              <strong>Date:</strong> {new Date(item.Date).toLocaleDateString()}
            </p>

            <p className="text-sm">
              <strong>Time:</strong> {item.selectTime}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {item.user.phone}
            </p>

            <div className="mt-4">
              {item.status === "PENDING" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(item.id, "APPROVED")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "REJECTED")}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  className={`font-medium ${
                    item.status === "APPROVED"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
