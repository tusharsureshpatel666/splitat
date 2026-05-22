"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { toggleStoreLike } from "@/lib/Like";

const MotionHeart = motion(Heart);

interface LoveStoreProps {
  storeId: string;
  initialLiked: boolean;
}

export default function LoveStore({ storeId, initialLiked }: LoveStoreProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();

  const onLike = () => {
    if (isPending) return;

    // 🔥 Optimistic UI
    setLiked((prev) => !prev);

    startTransition(async () => {
      try {
        const res = await toggleStoreLike(storeId);
        setLiked(res.liked);
      } catch (error) {
        // rollback if error
        setLiked((prev) => !prev);
      }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={onLike}
      disabled={isPending}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-4 transition",
        liked && "border-red-500",
      )}
    >
      <MotionHeart
        className={cn(
          "h-5 w-5 transition-colors",
          liked ? "fill-red-500 text-red-500" : "text-gray-500",
        )}
        animate={{
          scale: liked ? [1, 1.35, 0.9, 1] : 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      />

      {liked && (
        <motion.span
          className="absolute"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Heart className="h-6 w-6 fill-red-500 text-red-500" />
        </motion.span>
      )}

      <span className="text-sm font-medium md:flex hidden">
        {liked ? "Saved" : "Save"}
      </span>
    </Button>
  );
}
