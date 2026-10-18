import { useEffect, useRef, useState } from "react";

type Props = {
  isHovered: boolean;
};

export function useVideoPreview({ isHovered }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clipStartRef = useRef(0);
  const clipEndRef = useRef(0);
  const isLoopingRef = useRef(false);
  const waitingForMetadataRef = useRef(false);
  const seekTokenRef = useRef(0);
  const isHoveredRef = useRef(isHovered);
  const [isPlaying, setIsPlaying] = useState(false);

  isHoveredRef.current = isHovered;

  const startPreview = () => {
    const video = videoRef.current;
    if (!video || !isHoveredRef.current) return;

    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      waitingForMetadataRef.current = true;
      return;
    }

    waitingForMetadataRef.current = false;
    const attempt = ++seekTokenRef.current;
    const clipDuration = Math.min(4, video.duration);
    const latestStartTime = Math.max(0, video.duration - clipDuration);
    const startTime = Math.random() * latestStartTime;

    clipStartRef.current = startTime;
    clipEndRef.current = startTime + clipDuration;
    video.pause();

    const playAfterSeek = () => {
      if (!isHoveredRef.current || attempt !== seekTokenRef.current) return;

      void video
        .play()
        .then(() => {
          if (isHoveredRef.current && attempt === seekTokenRef.current) {
            setIsPlaying(true);
          } else if (!isHoveredRef.current) {
            video.pause();
          }
        })
        .catch((error) => {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          console.error("Video preview could not be played:", error);
        });
    };

    if (Math.abs(video.currentTime - startTime) < 0.01 && !video.seeking) {
      playAfterSeek();
    } else {
      video.addEventListener("seeked", playAfterSeek, { once: true });
      video.currentTime = startTime;
    }
  };

  const handleLoadedMetadata = () => {
    if (waitingForMetadataRef.current) {
      startPreview();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    if (!isHovered) {
      seekTokenRef.current += 1;
      waitingForMetadataRef.current = false;
      clipEndRef.current = 0;
      isLoopingRef.current = false;
      video.pause();
      setIsPlaying(false);
      return;
    }

    playTimeoutRef.current = setTimeout(startPreview, 600);

    return () => {
      seekTokenRef.current += 1;
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }
    };
  }, [isHovered]);

  const replayClip = (video: HTMLVideoElement) => {
    if (isLoopingRef.current) return;

    isLoopingRef.current = true;
    video.pause();
    video.addEventListener(
      "seeked",
      () => {
        isLoopingRef.current = false;
        if (isHoveredRef.current) {
          void video.play().catch((error) => {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
            console.error("Video preview could not be played:", error);
          });
        }
      },
      { once: true },
    );
    video.currentTime = clipStartRef.current;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || clipEndRef.current === 0 || isLoopingRef.current) return;

    if (video.currentTime >= clipEndRef.current) {
      replayClip(video);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video || !isHoveredRef.current || clipEndRef.current === 0) {
      clipEndRef.current = 0;
      setIsPlaying(false);
      return;
    }

    replayClip(video);
  };

  return {
    videoRef,
    isPlaying,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleEnded,
  };
}
