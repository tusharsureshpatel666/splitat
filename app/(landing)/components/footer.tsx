import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Splitat
            </h2>
            <p className="mt-2 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Discover trusted store partners or list your business and grow
              with confidence.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/Splitat.official/"
              aria-label="Instagram"
              className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Instagram size={18} />
            </Link>

            <Link
              href="https://x.com/Splitat_offical"
              aria-label="Twitter"
              className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Twitter size={18} />
            </Link>

            <Link
              href="https://www.youtube.com/@tysontyler4861"
              aria-label="Facebook"
              className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <Youtube size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} Splitat. All rights reserved.{" "}
          <Link href={"/common/privacy"} className="underline text-blue-500">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
