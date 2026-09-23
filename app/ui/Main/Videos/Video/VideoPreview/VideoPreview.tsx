import { formatTime } from "@/lib/services/formatTime";
import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: number;
  isHovered: boolean;
};

export default function VideoPreview({
  videoUrl,
  thumbnailUrl,
  duration,
  isHovered,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBarHovered, setIsBarHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Очищаем предыдущий timeout.
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    if (!isHovered) {
      video.pause();
      setIsPlaying(false);

      return;
    }

    // Запускаем видео только после задержки.
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

  const remainingTime = Math.max(
    0,
    Math.round(duration - (videoRef.current?.currentTime ?? 0)),
  );

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-200 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${thumbnailUrl ?? "/pictures/picture-1.jpg"})`,
        }}
      />

      {!isBarHovered ? (
        <div className="absolute z-1 bottom-2 right-2">
          <div className="flex gap-1.5 justify-center items-center px-1.5 py-2.5 h-[16px] text-xs bg-black/60 rounded">
            <div className="text-text-2">
              {!isPlaying ? formatTime(duration) : formatTime(remainingTime)}
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="group/bar absolute bottom-0 left-0 right-0 pt-2 hover:pb-2 hover:px-3 transition-all duration-200"
        onMouseEnter={() => setIsBarHovered(true)}
        onMouseLeave={() => setIsBarHovered(false)}
      >
        <div
          className={`bg-white/30 z-[5] transition-opacity duration-200 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-[3px] group-hover/bar:h-[5px] bg-red-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
