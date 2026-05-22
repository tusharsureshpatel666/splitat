"use client";

import Heading from "@/app/dashboard/components/heading";
import Image from "next/image";
import React, { useRef } from "react";

type StepImageProps = {
  bannerImage: File | null;
  setBannerImage: (file: File | null) => void;
  otherImages: (File | null)[];
  setOtherImages: (files: (File | null)[]) => void;
};

const StepImage: React.FC<StepImageProps> = ({
  bannerImage,
  setBannerImage,
  otherImages,
  setOtherImages,
}) => {
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const uploadBoxClasses =
    "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-zinc-900 cursor-pointer transition hover:border-primary hover:bg-gray-100 dark:hover:bg-zinc-800";

  return (
    <div className="space-y-6 w-full lg:p-6 rounded-xl">
      <Heading
        title="Upload Images"
        description="Add a banner image and room photos"
      />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Banner Image */}
        <div
          className={`${uploadBoxClasses} w-full md:w-2/3 h-64 md:h-130`}
          style={{ minHeight: "350px" }}
          onClick={() => bannerInputRef.current?.click()}
        >
          {bannerImage ? (
            <Image
              src={URL.createObjectURL(bannerImage)}
              alt="banner preview"
              className="w-full h-full object-cover rounded-xl"
              width={500}
              height={500}
            />
          ) : (
            <span className="text-gray-400 text-center">
              Click to upload Banner <br /> or drag & drop
            </span>
          )}

          <input
            type="file"
            ref={bannerInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* Other Images Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full md:w-1/2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`${uploadBoxClasses} h-36 md:h-64`}
              onClick={() => imageInputRefs.current[index]?.click()}
            >
              {otherImages[index] ? (
                <Image
                  src={URL.createObjectURL(otherImages[index] as File)}
                  alt={`preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                  width={300}
                  height={300}
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  + Image {index + 1}
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                ref={(el) => (imageInputRefs.current[index] = el)}
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  const updated = [...otherImages];

                  files.forEach((file, i) => {
                    if (index + i < 4) {
                      updated[index + i] = file;
                    }
                  });

                  setOtherImages(updated);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepImage;
