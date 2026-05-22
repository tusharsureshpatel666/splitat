"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { pusherClient } from "@/lib/pusher/client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaBell } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const { data: session } = useSession();

  const fetchUnseen = async () => {
    try {
      const res = await axios.get("/api/unseencount");
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (!session?.user?.id) return;
    fetchUnseen();
  }, [session?.user?.id]);

  // Realtime updates
  useEffect(() => {
    if (!session?.user?.id) return;

    const channelName = `notifications-${session.user.id}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", () => {
      fetchUnseen();
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(channelName);
    };
  }, [session?.user?.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <Button
            variant={"secondary"}
            size={"icon-lg"}
            className="rounded-full"
          >
            <FaBell />
          </Button>

          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] text-center">
              {count}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className=" mt-3 mr-4
    w-[90vw] sm:w-[320px] md:w-[380px] lg:w-[420px]
    max-h-[70vh]
    overflow-y-auto
    rounded-xl
    p-2
  "
      >
        {count === 0 && (
          <div className="flex items-center justify-center h-[120px] sm:h-[150px]">
            <span className="text-sm text-muted-foreground">
              No Notification
            </span>
          </div>
        )}

        {count > 0 && (
          <div className="h-[120px] sm:h-[150px]">
            <span className="text-sm text-muted-foreground">New Message</span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
