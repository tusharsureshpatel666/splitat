"use client";
import { useConversation } from "@/app/hooks/useConversation";
import { useRoutes } from "@/app/hooks/useRouter";
import React from "react";
import MobileItem from "./MobileItem";
import { useMobile } from "@/app/hooks/useMobilefooter";

const Mobilefooter = () => {
  const routes = useMobile();
  const { isOpen } = useConversation();

  return (
    <div className="fixed justify-between w-full bottom-0 z-7000 flex items-center bg-white dark:bg-black border lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default Mobilefooter;
