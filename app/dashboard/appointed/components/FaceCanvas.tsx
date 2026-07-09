"use client";

import { getFaceLandmarker } from "@/lib/face/mediapipe";
import { useEffect } from "react";


interface Props {
  webcamRef: any;

  isAligned: boolean;

  setIsAligned: (v: boolean) => void;

  countdown: number | null;

  setCountdown: (v: number | null) => void;

  isCapturing: boolean;

  setIsCapturing: (v: boolean) => void;

  onCaptured: (image: string) => void;
}

export default function FaceCanvas({
  webcamRef,

  isAligned,

  setIsAligned,

  countdown,

  setCountdown,

  isCapturing,

  setIsCapturing,

  onCaptured,
}: Props) {
  useEffect(() => {
    let animationId: number;

    let detector: any;

    async function init() {
      detector = await getFaceLandmarker();

      detect();
    }

    function detect() {
      if (!webcamRef.current?.video) {
        animationId = requestAnimationFrame(detect);

        return;
      }

      const video = webcamRef.current.video;

      if (video.readyState < 2) {
        animationId = requestAnimationFrame(detect);

        return;
      }

      const result = detector.detectForVideo(
        video,
        performance.now()
      );

      if (result.faceLandmarks.length > 0) {
        const landmarks = result.faceLandmarks[0];

        checkAlignment(landmarks);

      } else {
        setIsAligned(false);
      }

      animationId = requestAnimationFrame(detect);
    }

    function checkAlignment(landmarks: any[]) {
      const nose = landmarks[1];

      const centerX = nose.x;

      const centerY = nose.y;

      const distance = Math.sqrt(
        Math.pow(centerX - 0.5, 2) +
          Math.pow(centerY - 0.5, 2)
      );

      if (distance < 0.08) {
        setIsAligned(true);
      } else {
        setIsAligned(false);
      }
    }

    init();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    if (!isAligned) {
      setCountdown(null);

      return;
    }

    if (isCapturing) return;

    setIsCapturing(true);

    let value = 3;

    setCountdown(value);

    const timer = setInterval(() => {
      value--;

      if (value === 0) {
        clearInterval(timer);

        capture();

        setCountdown(null);

        setIsCapturing(false);

        return;
      }

      setCountdown(value);
    }, 1000);

    return () => clearInterval(timer);
  }, [isAligned]);

  function capture() {
    if (!webcamRef.current) return;

    const image = webcamRef.current.getScreenshot();

    if (!image) return;

    onCaptured(image);
  }

  return null;
}