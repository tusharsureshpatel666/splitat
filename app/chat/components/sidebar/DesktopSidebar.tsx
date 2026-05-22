"use client";
import { useRoutes } from "@/app/hooks/useRouter";
import React, { useState } from "react";
import DesktopItems from "./DesktopItems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const DesktopSidebar = () => {
  const router = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto bg-white dark:bg-black lg:border-r-[1px] lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {router.map((items) => (
            <DesktopItems
              key={items.label}
              href={items.href}
              label={items.label}
              icon={items.icon}
              active={items.active}
              onClick={items.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 mb-4 flex flex-col justify-between items-center">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Avatar>
            <AvatarImage src={session?.user?.image || "/avatar.avif"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
