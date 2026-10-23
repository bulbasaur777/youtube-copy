"use client";

import { useVideo } from "@/contexts/VideoContext";

export default function WatchMainVideoSkeleton() {
  const { isFullWidthVideo } = useVideo();

  return (
    <div
      aria-busy="true"
      aria-hidden="true"
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[#141414] ${
        isFullWidthVideo ? "max-h-[82vh]" : "rounded-2xl"
      }`}
    >
      <div className="aspect-square w-[16%] animate-spin rounded-full border-8 border-b-transparent border-white/25 border-t-white/80" />
    </div>
  );
}
