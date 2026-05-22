"use client";

import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher/client";
import axios from "axios";
import { MessageCircle, Plus, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationBell from "../addstore/components/TourNotification";
import Userbtn from "@/app/components/login/userbtn";

const DashNav = () => {
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
    <div
      className="
        sticky top-0 z-50
        flex justify-between items-center
        px-4 py-4
        md:px-6 md:py-5
        lg:px-9 lg:py-6
        bg-white dark:bg-[#09090b]
         
      "
    >
      <Link href="/dashboard" className="flex items-center ">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />

        <h2 className="text-xl font-semibold dark:text-white text-black">
          Splitat
        </h2>
      </Link>

      <div className="flex gap-3 items-center">
        {/* Button 1 — Find Store Partner */}
        {/* <Link href="/dashboard/findstore">
          <Button
            variant="outline"
            className="rounded-md lg:rounded-full cursor-pointer dark:text-white text-black flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="hidden lg:inline">Find Store Partner</span>
          </Button>
        </Link> */}
        {/* <Link href={"/dashboard/communitystore/Addcommunitystore"}>
          <Button
            variant="outline"
            className="rounded-md lg:rounded-full cursor-pointer dark:text-white text-black flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            <span className="hidden lg:inline">Add As Owner</span>
          </Button>
        </Link> */}

        {/* Button 2 — Share Your Store */}
        <Link href="/dashboard/addstore" className="hidden md:flex">
          <Button className="rounded-md lg:rounded-full cursor-pointer font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span className="hidden lg:inline">List Your Store</span>
          </Button>
        </Link>
        <Link href={"/chat/conversation"}>
          <Button
            className="relative rounded-full px-5 py-5"
            variant={"secondary"}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden lg:flex">Message</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[18px] text-center">
                {count}
              </span>
            )}
          </Button>
        </Link>
        {/* <NotificationBell /> */}
        <NotificationBell />

        <Userbtn />
      </div>
    </div>
  );
};

export default DashNav;
