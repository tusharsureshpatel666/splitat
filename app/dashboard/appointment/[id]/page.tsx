"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Calendar, Clock, Phone, Store, User } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  phoneNumber: string;
  Date: string;
  selectTime: string;
  UserPhoto: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdat: string;

  user: {
    name: string;
    email: string;
    image: string | null;
  };

  store: {
    title: string;
    businessType: string;
    fullAddress: string;
    priceInr: number;
  };
}

const AppointmentPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch appointment");
        }

        const data: Appointment = await response.json();

        setAppointment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />

        <Card>
          <CardContent className="p-6 space-y-5">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-5 w-40" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-52" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-52" />
              </div>
            </div>

            <Skeleton className="h-40 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Appointment not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Card className="overflow-hidden">
        <Image
          src={appointment.UserPhoto || "/placeholder.png"}
          alt={appointment.name}
          width={1000}
          height={500}
          className="w-full h-56 sm:h-72 object-cover"
        />

        <CardContent className="p-5 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
                <AvatarImage src={appointment.user.image || ""} />

                <AvatarFallback>
                  {appointment.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  {appointment.name}
                </h1>

                <p className="text-muted-foreground">Appointment Request</p>
              </div>
            </div>

            <Badge
              variant={
                appointment.status === "APPROVED"
                  ? "default"
                  : appointment.status === "REJECTED"
                    ? "destructive"
                    : "secondary"
              }
            >
              {appointment.status}
            </Badge>
          </div>

          {/* Appointment Details */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <InfoItem
                icon={<Calendar />}
                label="Date"
                value={new Date(appointment.Date).toLocaleDateString()}
              />

              <InfoItem
                icon={<Clock />}
                label="Time"
                value={appointment.selectTime}
              />

              <InfoItem
                icon={<Phone />}
                label="Phone"
                value={appointment.phoneNumber}
              />
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<Store />}
                label="Store"
                value={appointment.store.title}
              />

              <InfoItem
                icon={<User />}
                label="Customer"
                value={`${appointment.user.name} (${appointment.user.email})`}
              />

              <InfoItem
                label="Created"
                value={new Date(appointment.createdat).toLocaleString()}
              />
            </div>
          </div>

          {/* Store Details */}

          <Card className="bg-muted/40">
            <CardContent className="p-5">
              <h2 className="font-semibold text-lg mb-4">Store Information</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Name:</b> {appointment.store.title}
                </p>

                <p>
                  <b>Business:</b> {appointment.store.businessType}
                </p>

                <p className="break-words">
                  <b>Location:</b> {appointment.store.fullAddress}
                </p>

                <p>
                  <b>Rental Price:</b> ₹
                  {appointment.store.priceInr.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}

          {appointment.status === "PENDING" && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Accept Request
              </Button>

              <Button variant="destructive" className="flex-1">
                Reject Request
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      {icon && <div className="text-muted-foreground mt-1">{icon}</div>}

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

export default AppointmentPage;
