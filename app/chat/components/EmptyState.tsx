import Image from "next/image";
import React from "react";

const EmptyState = () => {
  return (
    <div className="px-4 hidden  py-10 w-full sm:px-6 lg:px-8 h-screen lg:flex justify-center items-center bg-gray-100 dark:bg-black">
      <div className="text-center items-center flex flex-col gap-4">
        <Image src={"/chat.svg"} width={350} height={350} alt="hello" />
        <h3 className="text-xl">Select a chat or start a new conversation</h3>
      </div>
    </div>
  );
};

export default EmptyState;
