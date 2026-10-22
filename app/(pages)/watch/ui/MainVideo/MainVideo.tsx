"use client";

import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/contexts/VideoContext";
import { useVideoLayout } from "@/contexts/VideoLayoutContext";
import type { VideoSourceVariant } from "@/hooks/useVideoController";

import Time from "./Time/Time";
import SwitchReplay from "./SwitchReplay/SwitchReplay";
import Playback from "./Playback/Playback";
import Volume from "./Volume/Volume";
import SwitchSubtitles from "./SwitchSubtitles/SwitchSubtitles";
import VideoSettings from "./VideoSettings/VideoSettings";
import VideoMode from "./VideoMode/VideoMode";
import FullScreenMode from "./FullScreenMode/FullScreenMode";
import { formatTime } from "@/lib/services/formatTime";

export default function MainVideo({
  isFullWidth = false,
  videoId,
  videoVariants,
  duration,
}: {
  isFullWidth?: boolean;
  videoId: string;
  videoVariants: VideoSourceVariant[];
  duration: number;
}) {
  const [isEndlessMode, setIsEndlessMode] = useState(true);
  const replayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    videoRef,
    progressBarRef,
    playerContainerRef,

    isPlaying,
    isMuted,
    isFullWidthVideo,
    isFullScreenMode,
    quality,
    availableQualities,
    videoSrc,
    previewVideoSrc,
    changeQuality,
    setVideoVariants,
    resetPlayback,

    progress,
    currentTime,
    videoDuration,

    isBarHovered,
    isScrubbing,
    previewProgress,
    canvasRef,
    previewTime,
    setPreviewVideoRef,

    togglePlayback,
    toggleFullScreen,

    handlePlay,
    handlePause,
    handleEnded,
    handleLoadedMetadata,
    handleTimeUpdate,

    handleProgressPointerEnter,
    handleProgressPointerLeave,
    handleProgressPointerMove,
    handleProgressPointerDown,
    handleProgressPointerUp,
    handleProgressPointerCancel,
  } = useVideo();

  const { handleChangeMode, isAnimating } = useVideoLayout();

  useEffect(() => {
    resetPlayback();
  }, [resetPlayback]);

  useEffect(() => {
    setVideoVariants(videoVariants, duration);
  }, [setVideoVariants, videoVariants, duration]);

  useEffect(() => {
    return () => {
      if (replayTimeoutRef.current !== null) {
        clearTimeout(replayTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (replayTimeoutRef.current !== null) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }
  }, [videoId]);

  const handleVideoEnded = () => {
    handleEnded();

    if (!isEndlessMode) return;

    if (replayTimeoutRef.current !== null) {
      clearTimeout(replayTimeoutRef.current);
    }

    replayTimeoutRef.current = setTimeout(() => {
      replayTimeoutRef.current = null;
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      void video.play().catch((error) => {
        console.error("Video could not be replayed:", error);
      });
    }, 3000);
  };

  const handleReplayModeChange = (nextIsEndlessMode: boolean) => {
    setIsEndlessMode(nextIsEndlessMode);

    if (!nextIsEndlessMode && replayTimeoutRef.current !== null) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }
  };

  return (
    <div
      ref={playerContainerRef}
      className={`${isFullWidth ? "dark" : ""} group relative z-4 bg-bg
        ${
          isFullScreenMode
            ? "h-screen w-screen overflow-hidden rounded-none bg-black"
            : ""
        }`}
    >
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-10 h-[68px] w-full rounded-b-none bg-black/20 px-2 sm:h-[75px] sm:px-4
          ${isFullWidth ? "" : "sm:rounded-b-2xl"}
          ${isFullScreenMode ? "rounded-none" : ""}
        `}
      >
        <div
          ref={progressBarRef}
          className="group/bar relative cursor-pointer touch-none py-2 sm:py-3"
          onPointerEnter={handleProgressPointerEnter}
          onPointerLeave={handleProgressPointerLeave}
          onPointerMove={handleProgressPointerMove}
          onPointerDown={handleProgressPointerDown}
          onPointerUp={handleProgressPointerUp}
          onPointerCancel={handleProgressPointerCancel}
        >
          <div className="relative h-1">
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/30 transition-transform duration-200 group-hover/bar:scale-y-[2]">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md transition-transform duration-200 group-hover/bar:scale-150"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <Playback isPlaying={isPlaying} onToggle={togglePlayback} />

            <Volume />

            <Time
              currentTime={Math.round(currentTime)}
              duration={Math.round(videoDuration)}
            />
          </div>

          <div className="flex items-center gap-2 rounded-full px-1 text-white sm:gap-6">
            <SwitchReplay
              isEndlessMode={isEndlessMode}
              onToggle={handleReplayModeChange}
            />

            <SwitchSubtitles isSubtitlesOn={true} onToggle={() => {}} />

            <VideoSettings
              quality={quality}
              availableQualities={availableQualities}
              onQualityChange={changeQuality}
            />

            {!isFullScreenMode && (
              <VideoMode
                isFullWidthModeOn={isFullWidthVideo}
                onToggle={handleChangeMode}
                disabled={isAnimating}
              />
            )}

            <FullScreenMode
              isFullScreenMode={isFullScreenMode}
              onToggle={toggleFullScreen}
            />
          </div>
        </div>
      </div>

      {/* Preview frame */}
      {(isBarHovered || isScrubbing) && previewProgress !== null && (
        <div
          className="absolute bottom-20 z-20 pointer-events-none"
          style={{
            left: `clamp(90px, ${previewProgress}% , calc(100% - 90px))`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-40 aspect-video object-cover rounded-md shadow-lg border border-white/20"
            />
            <div className="absolute bottom-1 left-1 px-1.5 py-0.5 text-xs bg-black/70 text-white rounded">
              {formatTime(Math.round(previewTime))}
            </div>
          </div>
        </div>
      )}

      {/* Preview video */}
      <video
        ref={setPreviewVideoRef}
        src={previewVideoSrc || undefined}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      <video
        key={videoId}
        ref={videoRef}
        muted={isMuted}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleVideoEnded}
        onClick={togglePlayback}
        onDoubleClick={toggleFullScreen}
        src={videoSrc || undefined}
        style={{ aspectRatio: "16 / 9" }}
        className={`
          w-full aspect-video
          ${
            isFullScreenMode
              ? "h-full max-h-none rounded-none object-contain"
              : isFullWidth
                ? "max-h-[82vh] rounded-none"
                : "rounded-2xl"
          }
        `}
      />
    </div>
  );
}
