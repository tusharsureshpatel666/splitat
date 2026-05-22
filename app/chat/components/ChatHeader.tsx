"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatHeaderSkeleton } from "@/app/loader/ChatHeaderLoader";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { FaBackward, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { PiRocketLaunchFill } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
export default function ChatHeader({
  conversationId,
}: {
  conversationId: string;
}) {
  const [header, setHeader] = useState<{
    id: string
    name: string;
    image: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;

    const fetchHeader = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/conversation/chatheader/${conversationId}`,
        );
        setHeader(res.data);
        console.log(res)
      } catch (error) {
        console.error("Header fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, [conversationId]);

  // ✅ Skeleton while loading
  if (loading) {
    return <ChatHeaderSkeleton />;
  }

  if (!header) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-b px-4 py-3 bg-white dark:bg-black">
      <Link href={"/chat/conversation"} className="flex lg:hidden">
        <Button variant={"secondary"}>
          <FaBackward />
        </Button>
      </Link>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <Image
            src={header.image}
            alt={header.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <AvatarFallback>
            {header.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-xs text-black dark:text-white">
            {header.name.split(" ").length > 5
              ? header.name.split(" ").slice(0, 5).join(" ") + "..."
              : header.name}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant={"secondary"}  className="rounded-full">
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline ">Call</span>
        </Button>

        {/* <Link href={`/dashboard/agreement/${conversationId}`}>
          <Button className="rounded-full">
            <MdAttachMoney className="w-5 h-5" />
            <span className="hidden sm:inline">Rent Now</span>
          </Button>
        </Link> */}
        <Link href={`/dashboard/tour/${header.id}`}>
          <Button className="rounded-full">
            <FaPaperPlane className="w-5 h-5" />
            <span className="hidden sm:inline ">Take Tour</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
