"use client";

import Heading from "@/app/dashboard/components/heading";
import { Video, Loader2, CloudUpload } from "lucide-react";
import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface TrueVideoProps {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  setVideoFile: (file: File | null) => void;
}

const TrueVideo = ({ videoUrl, setVideoUrl, setVideoFile }: TrueVideoProps) => {
    return (
      <input type="file"  />
    )

     
};

export default TrueVideo;
