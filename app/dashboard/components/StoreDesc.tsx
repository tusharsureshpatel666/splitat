"use client";

import React, { useState } from "react";

type StoreDescProps = {
  description: string;
  maxChars?: number;
};

const StoreDesc = ({ description, maxChars = 180 }: StoreDescProps) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > maxChars;
  const visibleText = expanded ? description : description.slice(0, maxChars);

  return (
    <div className="w-full rounded-lg bg-gray-100 dark:bg-muted/40 p-4 text-sm leading-relaxed">
      <h2 className="text-xl">Store Description</h2>
      <p className="whitespace-pre-line text-foreground">
        {visibleText}
        {!expanded && isLong && "..."}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 font-medium text-blue-600 hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default StoreDesc;
