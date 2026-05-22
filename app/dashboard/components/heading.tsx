import React from "react";
import clsx from "clsx";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div className={clsx("flex flex-col gap-1 sm:gap-2 md:gap-3", className)}>
      <h1
        className="
          text-lg font-semibold leading-tight 
          sm:text-lg
          md:text-2xl
          lg:text-3xl
        "
      >
        {title}
      </h1>

      {description && (
        <p
          className="
            text-sm text-gray-500 leading-relaxed
            sm:text-base
            md:text-lg
            
          "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
