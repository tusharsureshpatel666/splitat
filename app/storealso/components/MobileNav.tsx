"use client";
import { Bell, Home, LucideTarget, Package, PieChart, Trophy } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { FaBackward, FaForward } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";

const MobileNav = () => {
  const pathname = usePathname();
  const { id } = useParams();

  const isActive = (path) => {
   
    if (path === "audience") return pathname.startsWith(`/storealso/audience`);
    if (path === "footfall") return pathname.startsWith(`/storealso/footfall`);
    
  };

  const base =
    "flex flex-col items-center justify-center gap-1 text-[11px] transition-all duration-200 px-3 py-1 rounded-lg";

  const active = "text-blue-600 dark:text-blue-400 scale-105";

  const normal =
    "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white";

  return (
    <nav
      className="fixed bottom-0 left-0 w-full 
      bg-white/80 dark:bg-black
      border-t border-gray-200 dark:border-gray-900 
      flex justify-around items-center 
      py-4 lg:hidden z-50"
    >
      <Link
        href={`/dashboard`}
        className={`${base} ${isActive("home") ? active : normal}`}
      >
        <FaBackward size={20} />
      </Link>

      <Link
        href={`/storealso/audience/${id}`}
        className={`${base} ${isActive("audience") ? active : normal}`}
      >
        <LucideTarget size={20} />
      </Link>
      <Link
        href={`/storealso/Competition/${id}`}
        className={`${base} ${isActive("Competition") ? active : normal}`}
      >
        <Trophy size={20} />
      </Link>

      <Link
        href={`/storealso/footfall/${id}`}
        className={`${base} ${isActive("footfall") ? active : normal}`}
      >
        <IoFootsteps size={18} />
      </Link>
    </nav>
  );
};

export default MobileNav;
