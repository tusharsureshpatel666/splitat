"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const { data: session } = useSession();

  return (
    <div
      className="w-full
                      
                    p-6 lg:p-8"
    >
      <div
        className="flex flex-col 
                       items-center lg:gap-8"
      >
        {/* Profile Image */}
        <div
          className="relative 
                        h-28 w-28 
                        lg:h-36 lg:w-36 
                        overflow-hidden 
                        rounded-full 
                        bg-gray-200 
                        shrink-0"
        >
          <Image
            src={session?.user?.image || "/avatar.png"}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div
          className="mt-4 text-center 
                        lg:mt-0 lg:text-left"
        >
          <h1 className="text-xl lg:text-2xl text-center font-semibold text-gray-900 dark:text-white">
            {session?.user?.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
