"use client";

import React from "react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

type Props = {
  image?: string;
  name: string;
  createAt: string;
};

const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return past.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const OwnerButton = ({ image, name, createAt }: Props) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Avatar className="h-10 w-10">
        <Image
          src={image || "/avatar.avif"}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-medium capitalize">{name}</span>
        <span className="text-xs text-gray-500">{timeAgo(createAt)}</span>
      </div>
    </div>
  );
};

export default OwnerButton;
