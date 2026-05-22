import Heading from "@/app/dashboard/components/heading";
import React from "react";

type Props = {
  title: string;
  setTitle: (v: string) => void;
};
const StepTitle = ({ title, setTitle }: Props) => {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <Heading
        title="Tell me your store name"
        description="This will be shown publicly to customers."
        className="text-center"
      />

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Store name"
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
        Keep it short and easy to remember
      </p>
    </div>
  );
};

export default StepTitle;

{
  /* Store Description */
}
{
  /* <div className="flex flex-col gap-2">
            <Label className="text-md font-semibold dark:text-gray-200">
              Description
            </Label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write a short description about the store"
              className="
                w-full px-4 py-2 rounded-lg border 
                border-gray-400 dark:border-gray-600
                dark:text-white bg-white dark:bg-black
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                transition
                min-h-[200px]
              "
            />
          </div> */
}
