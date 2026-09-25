import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  isHovered: boolean;
  duration: number;
};

export function useVideoPreview({ isHovered, duration }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewFrameRequestRef = useRef<number | null>(null);
  const selectedTimeRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBarHovered, setIsBarHovered] = useState(false);
  const [previewProgress, setPreviewProgress] = useState<number | null>(null); // Положение курсора на progress bar в процентах
  const [isScrubbing, setIsScrubbing] = useState(false); // Идёт ли сейчас drag маркера

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    if (!isHovered) {
      video.pause();
      setIsPlaying(false);

      return;
    }

    playTimeoutRef.current = setTimeout(async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Video preview could not be played:", error);
      }
    }, 600);

    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }
    };
  }, [isHovered]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !video.duration) return;

    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const getProgressFromClientX = (clientX: number) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return 0;
    const rect = progressBar.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  };

  const seekPreviewVideo = (nextProgress: number) => {
    if (previewFrameRequestRef.current !== null) {
      cancelAnimationFrame(previewFrameRequestRef.current);
    }
    previewFrameRequestRef.current = requestAnimationFrame(() => {
      const previewVideo = previewVideoRef.current;
      if (!previewVideo || !previewVideo.duration) return;
      const nextTime = (nextProgress / 100) * previewVideo.duration;
      previewVideo.currentTime = nextTime;
      selectedTimeRef.current = nextTime;
    });
  };

  const handleProgressMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const nextProgress = getProgressFromClientX(event.clientX);
    setPreviewProgress(nextProgress);
    seekPreviewVideo(nextProgress);
  };

  const handleProgressMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const nextProgress = getProgressFromClientX(event.clientX);

    setIsScrubbing(true);

    const video = videoRef.current;

    if (!video || !video.duration) return;

    // Запоминаем, проигрывалось ли видео до начала перемещения.
    wasPlayingRef.current = !video.paused;

    // Ставим видео на паузу.
    video.pause();

    const nextTime = (nextProgress / 100) * video.duration;

    video.currentTime = nextTime;
    setProgress(nextProgress);

    selectedTimeRef.current = nextTime;
  };

  useEffect(() => {
    if (!isScrubbing) return;
    const handleWindowMouseMove = (event: MouseEvent) => {
      const nextProgress = getProgressFromClientX(event.clientX);

      const video = videoRef.current;

      if (!video || !video.duration) return;

      const nextTime = (nextProgress / 100) * video.duration;

      video.currentTime = nextTime;

      setProgress(nextProgress);

      selectedTimeRef.current = nextTime;
    };
    const handleWindowMouseUp = () => {
      const selectedTime = selectedTimeRef.current;

      if (selectedTime !== null) {
        const video = videoRef.current;
        const previewVideo = previewVideoRef.current;

        if (video && video.duration) {
          const finalProgress = (selectedTime / video.duration) * 100;

          setProgress(finalProgress);
          setPreviewProgress(finalProgress);

          if (previewVideo && previewVideo.duration) {
            previewVideo.currentTime = selectedTime;
          }
        }
      }

      setIsScrubbing(false);
      selectedTimeRef.current = null;

      // Возобновляем воспроизведение только если
      // видео проигрывалось до начала scrubbing.
      if (wasPlayingRef.current) {
        videoRef.current?.play().catch(() => {
          // Видео могло исчезнуть/размонтироваться
          // или браузер мог отклонить play().
        });
      }

      wasPlayingRef.current = false;
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isScrubbing]);

  useEffect(() => {
    const previewVideo = previewVideoRef.current;
    if (!previewVideo) return;
    const handleSeeked = () => {
      const canvas = canvasRef.current;
      if (!canvas || !previewVideo.videoWidth || !previewVideo.videoHeight) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = previewVideo.videoWidth;
      canvas.height = previewVideo.videoHeight;
      context.drawImage(previewVideo, 0, 0, canvas.width, canvas.height);
    };
    previewVideo.addEventListener("seeked", handleSeeked);
    return () => {
      previewVideo.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  const handleProgressMouseEnter = () => {
    setIsBarHovered(true);
  };
  const handleProgressMouseLeave = () => {
    setIsBarHovered(false);
    if (!isScrubbing) {
      setPreviewProgress(null);
    }
  };

  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
      if (previewFrameRequestRef.current !== null) {
        cancelAnimationFrame(previewFrameRequestRef.current);
      }
    };
  }, []);

  const remainingTime = Math.max(
    0,
    Math.round(duration - (videoRef.current?.currentTime ?? 0)),
  );

  const previewTime =
    previewProgress !== null
      ? (previewProgress / 100) *
        (previewVideoRef.current?.duration ?? duration)
      : 0;

  return {
    videoRef,
    previewVideoRef,
    canvasRef,
    progressBarRef,
    previewFrameRequestRef,
    isPlaying,
    isBarHovered,
    setIsBarHovered,
    handleTimeUpdate,
    handleEnded,
    handleProgressMouseMove,
    handleProgressMouseDown,
    handleProgressMouseEnter,
    handleProgressMouseLeave,
    progress,
    remainingTime,
    previewTime,
    previewProgress,
    isScrubbing,
  };
}
