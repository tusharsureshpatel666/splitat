import Heading from "@/app/dashboard/components/heading";
import { useSearchStoreData } from "@/store/store";
import React from "react";

const Price = () => {
  const { maxprice, maxsetPrice, minprice, minsetPrice } = useSearchStoreData();
  return (
    <div className="flex w-full flex-col items-center space-y-8 py-10">
      <Heading
        title="Tell your Price"
        description="Tell us your price to want to pay for the sharing we found for you"
        className="text-center"
      />

      {/* Price Input */}
      <div className="relative   flex items-center">
        <div>
          <label>Min</label>
          <span className="text-5xl font-semibold mr-1">₹</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="0"
            value={minprice}
            onChange={(e) => minsetPrice(e.target.value)}
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

        <div>
          <label>Max</label>
          <span className="text-5xl font-semibold mr-1">₹</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="0"
            value={maxprice}
            onChange={(e) => maxsetPrice(e.target.value)}
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
      </div>

      {Number(minprice) <= 0 && (
        <p className="text-sm text-red-500">Please enter a valid price</p>
      )}

      <div className="text-gray-600 text-sm underline cursor-pointer">
        Learn more about pricing
      </div>
    </div>
  );
};

export default Price;
