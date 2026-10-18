import { formatTime } from "@/lib/services/formatTime";
import { useVideoPreview } from "./hooks/useVideoPreview";
import Link from "next/link";

type Props = {
  videoId: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: number;
  isHovered: boolean;
};

export default function VideoPreview({
  videoId,
  videoUrl,
  thumbnailUrl,
  duration,
  isHovered,
}: Props) {
  const {
    videoRef,
    isPlaying,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleEnded,
  } = useVideoPreview({ isHovered });

  return (
    <div className="relative w-[60%] aspect-video overflow-hidden rounded-xl">
      <Link href={`/watch?videoId=${encodeURIComponent(videoId)}`}>
        {/* Main video */}
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Thumbnail */}
        <div
          className={`absolute inset-0 bg-cover bg-center rounded-xl transition-opacity duration-200 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${thumbnailUrl ?? "/pictures/picture-1.jpg"})`,
          }}
        />

        {!isHovered && (
          <div className="absolute z-1 bottom-2 right-2">
            <div className="flex gap-1.5 justify-center items-center px-1.5 py-2.5 h-[16px] text-xs bg-black/60 rounded">
              <div className="text-text-2">{formatTime(duration)}</div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}
