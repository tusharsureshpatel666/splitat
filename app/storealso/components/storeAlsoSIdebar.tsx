"use client";
import Userbtn from "@/app/components/login/userbtn";
import Image from "next/image";
import Link from "next/link";
import { Bell, PieChart, Package, LucideTarget } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { IoFootsteps } from "react-icons/io5";
import { FaBackward, FaTrophy } from "react-icons/fa";


const StorealsoSidebar = () => {
  const pathname = usePathname();
  const { id } = useParams();

  const isActive = (path) => pathname.startsWith(path);

  return (
    <aside className="hidden lg:flex flex-col justify-between w-[260px] h-screen sticky top-0 bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-gray-800">
      {/* 🔹 TOP */}
      <div>
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-gray-800"
        >
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <h2 className="text-lg font-semibold tracking-tight">Splitat</h2>
        </Link>

        {/* Menu */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {/* 🔸 Item */}
  

          <Link
            href={`/storealso/audience/${id}`}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all relative ${
              isActive("/storealso/audience")
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isActive("/storealso/audience") && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-black dark:bg-white rounded-r-full"></span>
            )}

            <LucideTarget size={18} />
            <span>Audience</span>
          </Link>

          <Link
            href={`/storealso/Competition/${id}`}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all relative ${
              isActive("/storealso/Competition")
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isActive("/storealso/Competition") && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-black dark:bg-white rounded-r-full"></span>
            )}

            <FaTrophy size={18} />
            <span>Competition</span>
          </Link>

          <Link
            href={`/storealso/footfall/${id}`}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all relative ${
              isActive("/storealso/footfall")
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isActive("/storealso/footfall") && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-black dark:bg-white rounded-r-full"></span>
            )}

            <IoFootsteps size={18} />
            <span>Footfall</span>
          </Link>
          <Link
            href={`/dashboard`}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all relative ${
              isActive("/adsfajlds")
                ? "bg-gray-100 dark:bg-gray-800 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <FaBackward size={20} /> Back
          </Link>
        </nav>
      </div>

      {/* 🔹 BOTTOM USER */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Userbtn />

          {/* Logout Button */}
        </div>
      </div>
    </aside>
  );
};

export default StorealsoSidebar;
