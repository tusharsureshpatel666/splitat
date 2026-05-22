"use client";
import { useState } from "react";

const PricingInfo = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowInfo(!showInfo)}
        className="text-gray-600 text-sm underline cursor-pointer"
      >
        Learn more about pricing
      </div>

      {showInfo && (
        <p className="mt-2 text-sm text-gray-500">
          A 10% platform fee will be added to the final amount.
        </p>
      )}
    </div>
  );
};

export default PricingInfo;
