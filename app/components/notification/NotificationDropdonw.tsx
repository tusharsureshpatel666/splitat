"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type Notification = {
  id: string;
  message: string;
  conversationId: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationDropdown({
  close,
  refreshCount,
}: {
  close: () => void;
  refreshCount: () => void;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get("/api/notifications");

      setNotifications(res.data);
      console.log(res.data);
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  const handleClick = async (notification: Notification) => {
    await axios.patch(`/api/notifications/${notification.id}`);
    refreshCount();
    close();
    router.push(`/chat/${notification.conversationId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-950 shadow-xl rounded-xl border z-50"
    >
      <div className="p-3 border-b font-semibold">Notifications</div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader className="h-5 w-5 animate-spin text-gray-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleClick(n)}
              className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900 text-sm transition ${
                !n.isRead ? "bg-gray-50 dark:bg-slate-950 font-medium" : ""
              }`}
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
