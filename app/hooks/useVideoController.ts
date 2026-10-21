"use client";

import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseVideoControllerOptions = {
  initialMainVideoMode: boolean;
  initialQuality: VideoQuality;
};

export type VideoQuality = "144p" | "720p";
export type VideoSourceVariant = {
  videoId: string;
  height: number;
  url: string;
};

export function useVideoController({
  initialMainVideoMode,
  initialQuality,
}: UseVideoControllerOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewFrameRequestRef = useRef<number | null>(null);
  const selectedTimeRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);

  /*
   * --------------------------------
   * Video state
   * --------------------------------
   */

  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullWidthVideo, setIsFullWidthVideo] =
    useState(initialMainVideoMode);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const [quality, setQuality] = useState<VideoQuality>(initialQuality);
  const [videoVariants, setVideoVariantsState] = useState<
    VideoSourceVariant[]
  >([]);
  const [previewVideoNode, setPreviewVideoNode] =
    useState<HTMLVideoElement | null>(null);
  const pendingSourceChangeRef = useRef<{
    currentTime: number;
    isPlaying: boolean;
  } | null>(null);

  const selectedVariant = videoVariants.find(
    (variant) => variant.height === Number.parseInt(quality, 10),
  );
  const fallbackVariant =
    videoVariants.find((variant) => variant.height === 720) ??
    videoVariants[0];
  const videoSrc = selectedVariant?.url ?? fallbackVariant?.url ?? "";
  const previewVideoSrc =
    videoVariants.find((variant) => variant.height === 144)?.url ??
    videoVariants[0]?.url ??
    "";
  const availableQualities = videoVariants
    .filter((variant) => variant.height === 144 || variant.height === 720)
    .map((variant) => `${variant.height}p` as VideoQuality);

  const setPreviewVideoRef = useCallback((node: HTMLVideoElement | null) => {
    previewVideoRef.current = node;
    setPreviewVideoNode(node);
  }, []);

  /*
   * --------------------------------
   * Progress / preview state
   * --------------------------------
   */

  const [isBarHovered, setIsBarHovered] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [previewProgress, setPreviewProgress] = useState<number | null>(null);

  /*
   * --------------------------------
   * Derived values
   * --------------------------------
   */

  const progress = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;
  const remainingTime = Math.max(0, videoDuration - currentTime);
  const previewTime =
    previewProgress !== null
      ? (previewProgress / 100) * (previewVideoRef.current?.duration ?? 0)
      : 0;

  /*
   * --------------------------------
   * Video metadata
   * --------------------------------
   */

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setVideoDuration(video.duration);

    const pendingSourceChange = pendingSourceChangeRef.current;
    const targetTime = pendingSourceChange?.currentTime ?? currentTime;
    const shouldResume = pendingSourceChange?.isPlaying ?? isPlaying;

    pendingSourceChangeRef.current = null;
    video.currentTime = Math.min(targetTime, video.duration);
    setCurrentTime(video.currentTime);
    video.volume = volume;
    video.muted = isMuted;

    if (shouldResume) {
      video.play().catch(() => {});
    }
  }, [currentTime, volume, isMuted, isPlaying]);

  const resetPlayback = useCallback(() => {
    pendingSourceChangeRef.current = { currentTime: 0, isPlaying: false };
    setCurrentTime(0);
    setVideoDuration(0);
    setIsPlaying(false);

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  }, []);

  const changeQuality = useCallback(
    (nextQuality: VideoQuality) => {
      if (
        nextQuality === quality ||
        !videoVariants.some(
          (variant) => variant.height === Number.parseInt(nextQuality, 10),
        )
      ) {
        return;
      }

      const video = videoRef.current;
      const pendingSourceChange = pendingSourceChangeRef.current;
      pendingSourceChangeRef.current = {
        currentTime:
          pendingSourceChange?.currentTime ?? video?.currentTime ?? currentTime,
        isPlaying:
          pendingSourceChange?.isPlaying ?? (video ? !video.paused : isPlaying),
      };
      document.cookie = `videoQuality=${nextQuality}; path=/; max-age=31536000; SameSite=Lax`;
      setQuality(nextQuality);
    },
    [currentTime, isPlaying, quality, videoVariants],
  );

  const setVideoVariants = useCallback(
    (nextVariants: VideoSourceVariant[]) => {
      const previousVideoId = videoVariants[0]?.videoId;
      const nextVideoId = nextVariants[0]?.videoId;

      if (previousVideoId !== nextVideoId) {
        pendingSourceChangeRef.current = {
          currentTime: 0,
          isPlaying: false,
        };
        setCurrentTime(0);
        setVideoDuration(0);
        setIsPlaying(false);
      }

      const hasCurrentQuality = nextVariants.some(
        (variant) => variant.height === Number.parseInt(quality, 10),
      );
      const nextQuality: VideoQuality = hasCurrentQuality
        ? quality
        : nextVariants.some((variant) => variant.height === 720)
          ? "720p"
          : nextVariants.some((variant) => variant.height === 144)
            ? "144p"
            : quality;

      if (nextQuality !== quality) {
        document.cookie = `videoQuality=${nextQuality}; path=/; max-age=31536000; SameSite=Lax`;
        setQuality(nextQuality);
      }

      setVideoVariantsState(nextVariants);
    },
    [quality, videoVariants],
  );

  /*
   * --------------------------------
   * Video time
   * --------------------------------
   */

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
  }, []);

  /*
   * --------------------------------
   * Playback
   * --------------------------------
   */

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(videoDuration);
  }, [videoDuration]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  /*
   * --------------------------------
   * Sound
   * --------------------------------
   */

  const handleVolumeChange = useCallback((value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted]);

  /*
   * --------------------------------
   * Progress bar
   * --------------------------------
   */

  const getProgressFromClientX = useCallback((clientX: number) => {
    const progressBar = progressBarRef.current;

    if (!progressBar) return 0;

    const rect = progressBar.getBoundingClientRect();

    const x = clientX - rect.left;

    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  const seek = useCallback((nextProgress: number) => {
    const video = videoRef.current;

    if (!video || !video.duration) return;

    const nextTime = (nextProgress / 100) * video.duration;

    video.currentTime = nextTime;

    setCurrentTime(nextTime);

    selectedTimeRef.current = nextTime;
  }, []);

  const seekPreviewVideo = useCallback((nextProgress: number) => {
    if (previewFrameRequestRef.current !== null) {
      cancelAnimationFrame(previewFrameRequestRef.current);
    }

    previewFrameRequestRef.current = requestAnimationFrame(() => {
      const previewVideo = previewVideoRef.current;

      if (!previewVideo || !previewVideo.duration) {
        return;
      }

      previewVideo.currentTime = (nextProgress / 100) * previewVideo.duration;
    });
  }, []);

  /*
   * --------------------------------
   * Progress bar events
   * --------------------------------
   */

  const handleProgressMouseEnter = useCallback(() => {
    setIsBarHovered(true);
  }, []);

  const handleProgressMouseLeave = useCallback(() => {
    setIsBarHovered(false);

    if (!isScrubbing) {
      setPreviewProgress(null);
    }
  }, [isScrubbing]);

  const handleProgressMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const nextProgress = getProgressFromClientX(event.clientX);

      setPreviewProgress(nextProgress);
      seekPreviewVideo(nextProgress);

      if (isScrubbing) {
        seek(nextProgress);
      }
    },
    [getProgressFromClientX, isScrubbing, seek, seekPreviewVideo],
  );

  const handleProgressMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      event.preventDefault();

      const video = videoRef.current;

      if (!video || !video.duration) {
        return;
      }

      wasPlayingRef.current = !video.paused;

      video.pause();

      setIsScrubbing(true);

      const nextProgress = getProgressFromClientX(event.clientX);

      seek(nextProgress);
    },
    [getProgressFromClientX, seek],
  );

  /*
   * --------------------------------
   * Scrubbing
   * --------------------------------
   */

  useEffect(() => {
    if (!isScrubbing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nextProgress = getProgressFromClientX(event.clientX);

      setPreviewProgress(nextProgress);
      seekPreviewVideo(nextProgress);
      seek(nextProgress);
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);

      if (wasPlayingRef.current) {
        videoRef.current?.play().catch(() => {});
      }

      wasPlayingRef.current = false;
      selectedTimeRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [getProgressFromClientX, isScrubbing, seek, seekPreviewVideo]);

  /*
   * --------------------------------
   * Preview
   * --------------------------------
   */

  const drawPreviewFrame = useCallback(() => {
    const video = previewVideoRef.current;
    const canvas = canvasRef.current;

    if (
      !video ||
      !canvas ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const video = previewVideoNode;

    if (!video) return;

    video.addEventListener("loadeddata", drawPreviewFrame);
    video.addEventListener("seeked", drawPreviewFrame);

    // На случай, если кадр уже загружен до установки обработчиков.
    drawPreviewFrame();

    return () => {
      video.removeEventListener("loadeddata", drawPreviewFrame);
      video.removeEventListener("seeked", drawPreviewFrame);
    };
  }, [previewVideoNode, drawPreviewFrame]);

  useEffect(() => {
    if ((isBarHovered || isScrubbing) && previewProgress !== null) {
      drawPreviewFrame();
    }
  }, [isBarHovered, isScrubbing, previewProgress, drawPreviewFrame]);

  /*
   * --------------------------------
   * Video mode
   * --------------------------------
   */

  useEffect(() => {
    const fullWidthMediaQuery = window.matchMedia("(max-width: 1023px)");

    const enforceFullWidthOnSmallScreens = () => {
      if (!fullWidthMediaQuery.matches || isFullWidthVideo) return;

      setIsFullWidthVideo(true);
      document.cookie =
        "mainVideoMode=true; path=/; max-age=31536000; SameSite=Lax";
    };

    enforceFullWidthOnSmallScreens();
    fullWidthMediaQuery.addEventListener("change", enforceFullWidthOnSmallScreens);

    return () => {
      fullWidthMediaQuery.removeEventListener(
        "change",
        enforceFullWidthOnSmallScreens,
      );
    };
  }, [isFullWidthVideo]);

  const changeMainVideoMode = useCallback(() => {
    setIsFullWidthVideo((prev) => {
      const next = window.matchMedia("(max-width: 1023px)").matches
        ? true
        : !prev;

      document.cookie = `mainVideoMode=${next}; path=/; max-age=31536000; SameSite=Lax`;

      return next;
    });
  }, []);

  /*
   * --------------------------------
   * Fullscreen mode
   * --------------------------------
   */

  const toggleFullScreen = useCallback(async () => {
    const container = playerContainerRef.current;

    if (!container) return;

    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      await container.requestFullscreen();
    } catch (error) {
      console.error("Failed to toggle fullscreen mode:", error);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreenMode(
        document.fullscreenElement === playerContainerRef.current,
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  /*
   * --------------------------------
   * Cleanup
   * --------------------------------
   */

  useEffect(() => {
    return () => {
      if (previewFrameRequestRef.current !== null) {
        cancelAnimationFrame(previewFrameRequestRef.current);
      }
    };
  }, []);

  return {
    videoRef,
    progressBarRef,
    previewVideoRef,
    canvasRef,

    currentTime,
    videoDuration,

    isPlaying,
    isMuted,
    volume,
    isFullWidthVideo,
    quality,
    availableQualities,
    videoSrc,
    previewVideoSrc,
    changeQuality,
    setVideoVariants,
    resetPlayback,

    progress,
    remainingTime,

    isBarHovered,
    isScrubbing,

    previewProgress,
    previewTime,
    setPreviewVideoRef,

    playerContainerRef,
    isFullScreenMode,

    togglePlayback,
    toggleMute,
    handleVolumeChange,

    handlePlay,
    handlePause,
    handleEnded,
    handleLoadedMetadata,
    handleTimeUpdate,

    handleProgressMouseEnter,
    handleProgressMouseLeave,
    handleProgressMouseMove,
    handleProgressMouseDown,

    changeMainVideoMode,
    toggleFullScreen,
  };
}

export type UseVideoReturn = ReturnType<typeof useVideoController>;
