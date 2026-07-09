"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Camera from "./Camera";
import Overlay from "./overlay";
import Countdown from "../Countdown";
import FaceCanvas from "../FaceCanvas";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center gap-8">

      <div className="relative w-[420px] h-[420px] rounded-3xl overflow-hidden bg-black">

        <Camera
          webcamRef={webcamRef}
        />

        <Overlay
          aligned={isAligned}
        />

        <Countdown
          count={countdown}
        />

        <FaceCanvas
            webcamRef={webcamRef}
            isAligned={isAligned}
            setIsAligned={setIsAligned}
            countdown={countdown}
            setCountdown={setCountdown}
            isCapturing={isCapturing}
            setIsCapturing={setIsCapturing}
            onCaptured={(image)=>{

                setCapturedImage(image)

                onCapture?.(image)

            }}
        />


      </div>
           <Button
  disabled={!isAligned}
  onClick={() => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) return;

    setCapturedImage(image);
    onCapture?.(image);
  }}
  className={`w-full max-w-sm h-12 rounded-xl transition-all duration-300 ${
    isAligned
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  <CameraIcon className="w-5 h-5 mr-2" />
  {isAligned ? "Capture Photo" : "Align Your Face"}
</Button>

      {capturedImage && (
        <Image
        width={50}
        height={50}
        alt="hello"
          src={capturedImage}
          className="w-44 rounded-xl border shadow"
        />
      )}

    </div>
  );
}