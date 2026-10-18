"use client";

import { createContext, ReactNode, useContext } from "react";

import { useVideoController, UseVideoReturn } from "@/hooks/useVideoController";

const VideoContext = createContext<UseVideoReturn | null>(null);

type Props = {
  children: ReactNode;
  initialMainVideoMode: boolean;
  initialQuality: "144p" | "720p";
};

export function VideoProvider({
  children,
  initialMainVideoMode,
  initialQuality,
}: Props) {
  const video = useVideoController({ initialMainVideoMode, initialQuality });

  return (
    <VideoContext.Provider value={video}>{children}</VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error("useVideo must be used within VideoProvider");
  }

  return context;
}
