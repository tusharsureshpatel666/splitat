import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="max-w-lg  text-gray-900 dark:text-gray-300  space-y-6">
      <p className="text-2xl leading-relaxed">
        “Shared my shop for the first time through this app — unbelievable! The
        match was perfect, the process was smooth, and I saved nearly 40% on
        rent. This is the future of small business spaces.”
      </p>

      <div className="flex items-center gap-3">
        <Image
          src="/avatar.avif"
          width={60}
          height={60}
          alt="user"
          className="rounded-md"
        />
        <p className="text-sm">@gwenstacy</p>
      </div>
    </div>
  );
};

export default Banner;
