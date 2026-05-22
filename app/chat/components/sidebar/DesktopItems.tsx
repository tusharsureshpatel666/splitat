"use client";

import Link from "next/link";
import clsx from "clsx";
import React from "react";

type Props = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
};

const DesktopItems = ({ href, label, icon: Icon, active, onClick }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
        group flex items-center gap-5 rounded-full px-3 py-3 text-sm
        transition-colors duration-200
        hover:bg-[#202c33]
        `,
        active && "bg-[#202c33]",
      )}
    >
      <Icon
        className={clsx(
          "h-4 w-4 text-gray-400 group-hover:text-white",
          active && "text-white",
        )}
      />
      <span
        className={clsx(
          "text-gray-300 group-hover:text-white sr-only",
          active && "text-green-400 font-medium",
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export default DesktopItems;
