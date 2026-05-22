"use client";

import React, { useState, useRef } from "react";
import clsx from "clsx";

type Props = {
  peopleDesc: string;
  maxLines?: number;
};

const PeopleDesc = ({ peopleDesc, maxLines = 3 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!peopleDesc) return null;

  return (
    <div className="mt-4 w-full rounded-xl bg-muted/70 p-4 text-sm">
      {/* Description */}
      <div
        className={clsx(
          "relative overflow-hidden whitespace-pre-line leading-relaxed transition-all duration-300",
          !expanded && `line-clamp-${maxLines}`,
        )}
      >
        {`Finding For ${peopleDesc}`}

        {/* Gradient fade like YouTube */}
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full  from-muted/90 to-transparent" />
        )}
      </div>

      {/* Toggle */}
      {peopleDesc.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-blue-600 hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default PeopleDesc;
