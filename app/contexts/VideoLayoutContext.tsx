"use client";

import { createContext, ReactNode, useContext, useRef } from "react";

import { useVideo } from "./VideoContext";
import { useFlipAnimation } from "@/(pages)/watch/hooks/useFlipAnimation";

type VideoLayoutContextType = {
  isAnimating: boolean;
  handleChangeMode: () => void;

  mainVideoRef: React.RefObject<HTMLDivElement | null>;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
};

const VideoLayoutContext = createContext<VideoLayoutContextType | null>(null);

export function VideoLayoutProvider({ children }: { children: ReactNode }) {
  const { isFullWidthVideo, changeMainVideoMode } = useVideo();
  const { isAnimating, runFlip } = useFlipAnimation();

  const mainVideoRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleChangeMode = async () => {
    const video = mainVideoRef.current;
    const sidebar = sidebarRef.current;

    if (!video || !sidebar) {
      changeMainVideoMode();
      return;
    }

    runFlip({
      elements: [
        {
          element: video,
          target: () => mainVideoRef.current,
          scale: true,
        },
        {
          element: sidebar,
          target: () => sidebarRef.current,
        },
      ],
      changeLayout: changeMainVideoMode,
    });
  };

  return (
    <VideoLayoutContext.Provider
      value={{
        isAnimating,
        handleChangeMode,
        mainVideoRef,
        sidebarRef,
      }}
    >
      {children}
    </VideoLayoutContext.Provider>
  );
}

export function useVideoLayout() {
  const context = useContext(VideoLayoutContext);

  if (!context) {
    throw new Error("useVideoLayout must be used within VideoLayoutProvider");
  }

  return context;
}
