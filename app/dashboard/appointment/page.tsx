"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../components/heading";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Appointment {
  id: string;
  Date: string;
  selectTime: string;
  status: string;
  store: {
    id: string;
    title: string;
    fullAddress: string;
    bannerImageUrl: string;
  };
}

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointmentlist");
        setAppointments(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="w-full mx-auto p-6">
        <div className="space-y-2 mb-6">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden bg-background"
            >
              {/* Image */}
              <Skeleton className="w-full h-48 rounded-none" />

              <div className="p-5 space-y-4">
                {/* Title */}
                <Skeleton className="h-6 w-3/4" />

                {/* Address */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Date */}
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Time */}
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Status */}
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return <div className="p-6 text-center">No appointments found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mb-4 p-6">
      <Heading
        title="My Appointments"
        description="View all your scheduled appointments, check their status, and see the date, time, and store details in one place."
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Link
            href={`/dashboard/store/${appointment.store.id}`}
            key={appointment.id}
            className=" border rounded-2xl cursor-pointer shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            <Image
              src={appointment.store.bannerImageUrl || "/placeholder.png"}
              alt={appointment.store.title}
              width={500}
              height={250}
              className="h-[300px] object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold truncate">
                {appointment.store.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {appointment.store.fullAddress}
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">
                    {new Date(appointment.Date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{appointment.selectTime}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
