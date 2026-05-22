"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  videoUrl: string;
  poster?: string; // optional thumbnail
};

const VideoPlay = ({ videoUrl, poster }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className="
        relative w-full h-[420px]
        rounded-2xl overflow-hidden
        bg-black cursor-pointer
      "
      onClick={togglePlay}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="h-7 w-7 text-black ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlay;
