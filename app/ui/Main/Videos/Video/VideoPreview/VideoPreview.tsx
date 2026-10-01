import { formatTime } from "@/lib/services/formatTime";
import { useVideoPreview } from "./hooks/useVideoPreview";
import VolumeIcon from "./icons/VolumeIcon";
import MutedIcon from "./icons/MutedIcon";
import Link from "next/link";

type Props = {
  videoUrl: string;
  previewVideoUrl: string | null;
  thumbnailUrl: string | null;
  duration: number;
  isHovered: boolean;
};

export default function VideoPreview({
  videoUrl,
  previewVideoUrl,
  thumbnailUrl,
  duration,
  isHovered,
}: Props) {
  const {
    videoRef,
    previewVideoRef,
    canvasRef,
    progressBarRef,
    isPlaying,
    isBarHovered,
    setIsBarHovered,
    handleTimeUpdate,
    handleEnded,
    handleProgressMouseMove,
    handleProgressMouseDown,
    handleProgressMouseEnter,
    handleProgressMouseLeave,
    handleSwitchSound,
    progress,
    remainingTime,
    previewTime,
    previewProgress,
    isScrubbing,
  } = useVideoPreview({ isHovered, duration });

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <Link href="/watch">
        {/* Main video */}
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

        {/* Preview video */}
        <video
          ref={previewVideoRef}
          src={previewVideoUrl ? previewVideoUrl : videoUrl}
          muted
          playsInline
          preload="auto"
          className="hidden"
        />

        {/* Thumbnail */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-200 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${thumbnailUrl ?? "/pictures/picture-1.jpg"})`,
          }}
        />

        {/* Preview Frame */}
        {isBarHovered &&
          !isScrubbing &&
          previewProgress !== null &&
          isPlaying && (
            <div
              className="absolute bottom-8 z-20 pointer-events-none"
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

        {/* Remaining Time */}
        {!isBarHovered && !isScrubbing && (
          <div className="absolute z-1 bottom-2 right-2">
            <div className="flex gap-1.5 justify-center items-center px-1.5 py-2.5 h-[16px] text-xs bg-black/60 rounded">
              <div className="text-text-2">
                {!isPlaying ? formatTime(duration) : formatTime(remainingTime)}
              </div>
            </div>
          </div>
        )}
      </Link>

      {isHovered && isPlaying && (
        <div
          className="flex justify-center items-center size-10 absolute top-2 right-2 rounded-full bg-black/60 opacity-90"
          onClick={handleSwitchSound}
        >
          {videoRef.current?.muted ? <MutedIcon /> : <VolumeIcon />}
        </div>
      )}

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className={`group/bar absolute bottom-0 left-0 right-0 pt-2 hover:pb-2 hover:px-3 transition-all duration-200`}
        onMouseEnter={handleProgressMouseEnter}
        onMouseLeave={handleProgressMouseLeave}
        onMouseMove={handleProgressMouseMove}
        onMouseDown={handleProgressMouseDown}
      >
        <div
          className={`relative bg-white/30 z-[5] transition-opacity duration-200 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Video progress */}
          <div
            className="h-[3px] group-hover/bar:h-[5px] bg-red-500"
            style={{
              width: `${progress}%`,
            }}
          />

          {/* Marker */}
          {isBarHovered && (
            <div
              className="absolute top-1/2 w-3 h-3 rounded-full bg-white shadow-md"
              style={{
                left: `${progress}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
