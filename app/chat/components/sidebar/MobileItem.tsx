"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  href: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
  label: string;
};

const MobileItem = ({ href, icon: Icon, onClick, label }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} onClick={onClick} className="relative w-full">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: active ? "#2563eb" : "transparent",
        }}
        transition={{ duration: 0.3 }}
        className={clsx("group flex items-center justify-center p-3 ")}
      >
        <Icon
          className={clsx(
            "h-6 w-6 transition-colors duration-300",
            active ? "text-white" : "text-gray-400",
          )}
        />

        {/* Active indicator dot */}
      </motion.div>
    </Link>
  );
};

export default MobileItem;
