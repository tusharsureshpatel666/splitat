import React from "react";
import EmptyState from "../components/EmptyState";

const page = () => {
  return (
    <div className="w-full hidden lg:flex">
      <EmptyState />
    </div>
  );
};

export default page;
