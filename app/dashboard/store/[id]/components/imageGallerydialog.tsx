"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  initialIndex: number;
};

export function ImageGalleryDialog({
  open,
  onOpenChange,
  images,
  initialIndex,
}: Props) {
  const [zoomed, setZoomed] = useState(false);

  // lock scroll when open (important UX)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed h-full inset-0 z-50 bg-black">
      {/* CLOSE BUTTON */}
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-50 cursor-pointer text-white hover:opacity-80"
      >
        <X size={28} />
      </button>

      {/* IMAGE SLIDER */}
      <Swiper
        initialSlide={initialIndex}
        slidesPerView={1}
        className="h-full w-full"
        onSlideChange={() => setZoomed(false)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="
                relative h-full w-full
                flex items-center justify-center
                overflow-hidden
                select-none
              "
              onClick={() => setZoomed(!zoomed)}
            >
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === initialIndex}
                className={`
                  object-contain
                  transition-transform duration-300 ease-in-out
                  cursor-zoom-${zoomed ? "out" : "in"}
                  ${zoomed ? "scale-150" : "scale-100"}
                `}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ZOOM HINT (like brands) */}
      <div className="absolute bottom-4 w-full text-center text-white text-xs opacity-70">
        Tap image to {zoomed ? "zoom out" : "zoom in"}
      </div>
    </div>
  );
}
