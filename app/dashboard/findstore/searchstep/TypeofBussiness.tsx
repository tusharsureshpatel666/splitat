import { useSearchStoreData } from "@/store/store";
import React from "react";
import Heading from "../../components/heading";

const TypeOfBusiness = () => {
  const { TypeofStore, setTypeofBussiness } = useSearchStoreData();

  return (
    <div className="w-full flex flex-col items-center space-y-8 text-center">
      <Heading
        title="What Type of Business Are You Starting?"
        description="Tell us about your business so we can connect you with a shop that’s right for you."
      />

      <input
        type="text"
        value={TypeofStore}
        onChange={(e) => setTypeofBussiness(e.target.value)}
        placeholder="Business Type"
        className="
          w-full max-w-xl
          text-6xl font-semibold text-center
          bg-transparent
          border-none outline-none
          caret-black dark:caret-white
          placeholder:text-gray-400
          dark:text-white
          focus:ring-0
        "
      />

      <p className="text-sm text-gray-500 text-center">
        For example: café, clothing store, gaming zone, yoga studio
      </p>
    </div>
  );
};

export default TypeOfBusiness;
