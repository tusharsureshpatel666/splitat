import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div
      className="
        flex justify-between items-center
        px-4 py-4        /* mobile padding */
        md:px-6 md:py-5  /* tablet padding */
        lg:px-9 lg:py-6  /* desktop padding */
        h-auto           /* height auto so padding controls it */
      "
    >
      <Link href={"/"} className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <h2 className="text-xl font-semibold dark:text-white text-black">
          Splitat
        </h2>
      </Link>
      <Link href={"/common/privacy"}>
        <Button
          variant={"outline"}
          className="cursor-pointer  dark:text-white  md:text-base"
        >
          Privacy
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
