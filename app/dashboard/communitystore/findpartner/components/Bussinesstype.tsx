import Heading from "@/app/dashboard/components/heading";
import React from "react";

type Props = {
  btitle: string;
  setbTitle: (v: string) => void;
};
const StepBTitle = ({ btitle, setbTitle }: Props) => {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <Heading
        title="What kind of Bussiness you do"
        description="Tell us about your bussiness you wanna do in store i.e Salon gaming center other"
        className="text-center"
      />

      <input
        type="text"
        value={btitle}
        onChange={(e) => setbTitle(e.target.value)}
        placeholder="Bussiness Type"
        className="
          w-full max-w-xl
          md:text-4xl text-2xl  lg:text-6xl font-semibold text-center
          bg-transparent
          border-none outline-none
          caret-black dark:caret-white
          placeholder:text-gray-400
          dark:text-white
          focus:ring-0
        "
      />
      <p className="text-sm text-gray-500 text-center">
        Keep it short and easy to remember
      </p>
    </div>
  );
};

export default StepBTitle;
