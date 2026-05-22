// components/LocationProvider.tsx
"use client";

import { getUserLocationCached } from "@/lib/getUserLocation";
import { useEffect } from "react";

export function LocationProvider() {
  useEffect(() => {
    getUserLocationCached().catch(() => {});
  }, []);

  return null;
}
