"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CouponPage = () => {
  const [copied, setCopied] = useState(false);

  const couponCode = "FREESplitat";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    toast.success("Coupon copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">Grab Your Free Coupon!</h1>
      <p className="text-gray-600">
        Use this code at checkout to get free access to premium store listings.
      </p>

      <div className="inline-flex items-center gap-4 bg-gray-100 dark:bg-gray-800 px-6 py-4 rounded-lg">
        <span className="text-xl font-mono tracking-widest">{couponCode}</span>
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Limited time offer. Use it before it expires!
      </p>
    </div>
  );
};

export default CouponPage;
