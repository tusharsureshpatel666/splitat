"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const Appointmentbell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/appointment/unread");

        if (!res.ok) return;

        const data = await res.json();

        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadCount();

    // Refresh every 10 seconds
    const interval = setInterval(fetchUnreadCount, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/dashboard/appointment/notific">
      <Button
        variant="secondary"
        className="relative rounded-full p-5 cursor-pointer"
      >
        <FaBell className="text-lg" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default Appointmentbell;
