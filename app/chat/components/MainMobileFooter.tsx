"use client";
import { useMobile } from "@/app/hooks/useMobilefooter";
import React from "react";
import MobileItem from "./sidebar/MobileItem";

const MainMobileFooter = () => {
  const route = useMobile();
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-black lg:hidden  border">
      {route.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          label={route.label}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default MainMobileFooter;
