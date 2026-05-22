"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

type Notification = {
  id: string;
  message: string;
  read: boolean;
  userImage?: string | null;
  createdAt?: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 🔄 Fetch notifications
  const fetchNotifications = async () => {
    const res = await fetch("/api/tournotific");
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔴 Count unread
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ Mark single as read
  const markAsRead = async (id: string) => {
    await fetch(`/api/tournotific/${id}`, {
      method: "PATCH",
    });

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // ✅ Mark all as read
  const markAllAsRead = async () => {
    await fetch("/api/tournotific/mark-all", {
      method: "PATCH",
    });

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      {/* 🔔 Bell Button */}
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative rounded-full py-5 px-5">
          <FaBell className="text-lg" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* 📦 Dropdown */}
      <DropdownMenuContent
        align="end"
        className="w-[90vw] ml-5 sm:w-[350px] md:w-[400px] max-h-[60vh] p-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-semibold text-sm">Notifications</span>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <p className="text-sm text-center py-6">No notifications</p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex items-start gap-3 p-3 border-b text-sm cursor-pointer transition ${
                  !n.read ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                {/* 👤 User Image */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={n.userImage || "/avatar.avif"}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <span className="text-sm">{n.message}</span>

                  {n.createdAt && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
