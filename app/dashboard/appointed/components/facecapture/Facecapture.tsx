"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon, RotateCcw } from "lucide-react";

import Camera from "./Camera";
import Overlay from "./overlay";
import Countdown from "../Countdown";
import FaceCanvas from "../FaceCanvas";

import { Button } from "@/components/ui/button";

interface FaceCaptureProps {
  onCapture?: (image: string) => void;
}

export default function FaceCapture({
  onCapture,
}: FaceCaptureProps) {
  const webcamRef = useRef<any>(null);

  const [capturedImage, setCapturedImage] = useState("");

  const [isAligned, setIsAligned] = useState(false);

  const [countdown, setCountdown] = useState<number | null>(null);

  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) return;

    setCapturedImage(image);

    onCapture?.(image);
  };

  const handleRetake = () => {
    setCapturedImage("");
    setIsAligned(false);
    setCountdown(null);
    setIsCapturing(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">

      <div className="relative w-[420px] h-[420px] rounded-3xl overflow-hidden bg-black shadow-xl">

        {!capturedImage ? (
          <>
            <Camera webcamRef={webcamRef} />

            <Overlay aligned={isAligned} />

            <Countdown count={countdown} />

            <FaceCanvas
              webcamRef={webcamRef}
              isAligned={isAligned}
              setIsAligned={setIsAligned}
              countdown={countdown}
              setCountdown={setCountdown}
              isCapturing={isCapturing}
              setIsCapturing={setIsCapturing}
              onCaptured={(image) => {
                setCapturedImage(image);
                onCapture?.(image);
              }}
            />
          </>
        ) : (
          <Image
            src={capturedImage}
            alt="Captured Face"
            fill
            unoptimized
            className="object-cover"
          />
        )}
      </div>

      {!capturedImage ? (
        <Button
          disabled={!isAligned}
          onClick={handleCapture}
          className={`w-full max-w-sm h-12 rounded-xl transition-all duration-300 ${
            isAligned
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <CameraIcon className="mr-2 h-5 w-5" />

          {isAligned ? "Capture Photo" : "Align Your Face"}
        </Button>
      ) : (
        <div className="flex gap-3">

          <Button
            variant="outline"
            onClick={handleRetake}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Photo
          </Button>

      

        </div>
      )}
    </div>
  );
}