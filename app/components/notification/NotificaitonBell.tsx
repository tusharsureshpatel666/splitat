"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HiBell } from "react-icons/hi";
import NotificationDropdown from "./NotificationDropdonw";
import { Button } from "@/components/ui/button";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await axios.get("/api/notifications/count");
      setCount(res.data.count);
      console.log(res);
    };

    fetchCount();
  }, [count]);

  return (
    <div className="relative">
      <Button
        variant={"secondary"}
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-full"
      >
        <HiBell className="h-6 w-6 text-gray-700 dark:text-white" />

        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full"
          >
            {count}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <NotificationDropdown
            close={() => setOpen(false)}
            refreshCount={() => {
              // optional refetch
              axios
                .get("/api/notifications/count")
                .then((res) => setCount(res.data.count));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
