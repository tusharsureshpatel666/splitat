"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ImageGalleryDialog } from "./imageGallerydialog";

export function MobileImageSlider({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="md:hidden w-full">
        <Swiper spaceBetween={12} slidesPerView={1.05}>
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <Image
                  src={img}
                  alt="Store image"
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ImageGalleryDialog
        open={open}
        onOpenChange={setOpen}
        images={images}
        initialIndex={index}
      />
    </>
  );
}
