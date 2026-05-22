"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGalleryDialog } from "./imageGallerydialog";

type DesktopImageGridProps = {
  banner: string;
  images: string[];
};

export function DesktopImageGrid({ banner, images }: DesktopImageGridProps) {
  const allImages = [banner, ...images];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      {/* IMAGE GRID */}
      <div
        className="
          relative
          grid
          grid-cols-2 md:grid-cols-4
          grid-rows-2
          gap-2
          rounded-2xl
          overflow-hidden
          h-[360px] sm:h-[320px] md:h-[480px] lg:h-[650px]
        "
      >
        {/* LEFT BIG IMAGE */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <Image
            src={banner}
            alt="Main image"
            fill
            priority
            quality={100} // <-- Highest quality
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* RIGHT 4 IMAGES (hidden on mobile) */}
        {images.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer hidden md:block"
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              fill
              quality={100} // <-- Highest quality
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}
      <ImageGalleryDialog
        open={open}
        onOpenChange={setOpen}
        images={allImages}
        initialIndex={index}
      />
    </>
  );
}
