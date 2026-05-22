"use client";
import { usePathname } from "next/navigation";
import { useConversation } from "./useConversation";
import { useMemo } from "react";
import { HiChatBubbleOvalLeft } from "react-icons/hi2";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { IoAdd, IoLogOut } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { MdHome } from "react-icons/md";
import { MessageCircle } from "lucide-react";
import { FaStoreAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiStorefrontLight } from "react-icons/pi";

export const useMobile = () => {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/dashboard",
        icon: MdHome,
        active: pathName === "/home",
      },

      {
        label: "search",
        href: "/dashboard/searchbar",
        icon: CiSearch,
        active: pathName === "/dashboard/searchbar",
      },
      {
        label: "Add Store",
        href: "/dashboard/addstore",

        icon: IoAdd,
        active: pathName === "/dashboard/addstore",
      },
      {
        label: "Messages",
        href: "/chat/conversation",

        icon: IoChatboxEllipsesOutline,
        active: pathName === "/chat/conversation",
      },
      {
        label: "Your Store",
        href: "/dashboard/yourstore",

        icon: PiStorefrontLight,
        active: pathName === "/chat/conversation",
      },
    ],

    [pathName],
  );
  return routes;
};
