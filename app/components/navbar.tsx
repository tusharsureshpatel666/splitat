"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navHref = [
    { name: "Find Store", href: "/dashboard" },
    { name: "About Us", href: "/common/about" },
    
    { name: "Blog", href: "/common/blog" },
    { name: "Contact Us", href: "/common/contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Splitat
          </h2>
        </Link>

        {/* Desktop Links */}
        <div className="relative ml-10 hidden gap-6 md:flex">
          {navHref.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-1 text-sm font-medium transition-colors
        ${
          isActive(item.href)
            ? "text-black dark:text-white"
            : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        }`}
            >
              {item.name}

              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-black dark:bg-white"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden gap-3 md:flex">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full font-semibold">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 dark:text-gray-300"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-5">
              {navHref.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    border-l-2 py-2 pl-3 text-lg transition
                    ${
                      isActive(item.href)
                        ? "border-black text-black dark:border-white dark:text-white"
                        : "border-transparent text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-3">
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full rounded-full">Get Splitat Free</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
