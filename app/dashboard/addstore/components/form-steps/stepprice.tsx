"use client";

import Heading from "@/app/dashboard/components/heading";
import PricingInfo from "./priceInfo";

interface PriceInputProps {
  price: string;
  setPrice: (value: string) => void;
}

const PriceInput = ({ price, setPrice }: PriceInputProps) => {
  return (
    <div className="flex flex-col w-full items-center space-y-8 py-10">
      <Heading
        title="Set Your Store Share Price"
        description="This is the amount users will pay to share your store."
        className="text-center"
      />

      {/* Price Input */}
      <div className="relative flex items-center">
        <span className="text-5xl font-semibold mr-1">₹</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="
            no-spinner
            w-[200px]
            text-6xl
            font-semibold
            text-center
            bg-transparent
            outline-none
            border-none
            focus:ring-0
          "
        />
      </div>

      {Number(price) <= 0 && (
        <p className="text-sm text-red-500">Please enter a valid price</p>
      )}

      <PricingInfo />
    </div>
  );
};

export default PriceInput;
