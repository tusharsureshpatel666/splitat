"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";

const PhoneAnyalitic = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="">
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="px-5 py-3 rounded-full  flex items-center gap-2"
        >
          <FaChartLine />

          <span className="hidden lg:flex">Analytics</span>
        </Button>
      </div>

      {/* Full Screen Modal */}
      {open && (
        <div className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center">
          <div className="dark:bg-black bg-white text-black dark:text-white w-full h-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 cursor-pointer text-xl"
            >
              <IoClose />
            </button>

            {/* Content */}
            <h1 className="text-2xl font-bold mb-6">Store Analytics</h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">Location Data</div>
              <div className="p-4 border rounded-lg">Target Audience</div>
              <div className="p-4 border rounded-lg">Revenue Estimate</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhoneAnyalitic;
