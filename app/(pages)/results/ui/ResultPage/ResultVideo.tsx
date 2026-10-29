"use client";

import {
  useCallback,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { searchVideos } from "@/lib/data/videos";
import type { Lang } from "@/types/language";
import { formatTimeAgo, formatViews } from "@/lib/services/formatTime";
import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import VideoContexMenu from "@/ui/Main/Videos/Video/VideoContextMenu/VideoContextMenu";
import VideoPreview from "@/ui/Main/Videos/Video/VideoPreview/VideoPreview";

type Video = Awaited<ReturnType<typeof searchVideos>>[number];

const translations = { ru, ua, en } as const;

export default function ResultVideo({
  video,
  lang,
  priority,
}: {
  video: Video;
  lang: Lang;
  priority: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const handleThumbnailLoaded = useCallback(() => setThumbnailLoaded(true), []);
  const router = useRouter();
  const text = translations[lang];
  const videoUrl =
    video.variants.find((variant) => variant.height === 720)?.url ??
    video.variants[0]?.url ??
    "";
  const previewVideoUrl =
    video.variants.find((variant) => variant.height === 144)?.url ??
    video.variants[0]?.url ??
    null;
  const watchUrl = `/watch?videoId=${encodeURIComponent(video.id)}`;

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (
      event.target instanceof Element &&
      event.target.closest("a, button, [role='button']")
    ) {
      return;
    }

    router.push(watchUrl);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && event.key === "Enter") {
      router.push(watchUrl);
    }
  };

  return (
    <motion.article
      aria-busy={!thumbnailLoaded}
      role="link"
      tabIndex={0}
      className="group relative flex min-w-0 cursor-pointer flex-col gap-3 sm:flex-row sm:gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      whileHover="hover"
      initial="initial"
    >
      <div className="w-full shrink-0 self-start sm:w-[min(42%,480px)]">
        <VideoPreview
          videoId={video.id}
          videoUrl={videoUrl}
          previewVideoUrl={previewVideoUrl}
          thumbnailUrl={video.thumbnailUrl}
          duration={video.duration}
          isHovered={isHovered}
          onThumbnailLoaded={handleThumbnailLoaded}
          priority={priority}
        />
      </div>

      <div className="relative min-w-0 flex-1 pr-9 text-text">
        <div onClick={(event) => event.stopPropagation()}>
          <VideoContexMenu />
        </div>
        <Link
          href={watchUrl}
          className="line-clamp-2 text-lg font-normal leading-6"
        >
          {video.title}
        </Link>
        <p className="mt-1 text-sm text-text/70">
          {formatViews(
            video.viewsCount,
            lang,
            text["Time and Views"].views,
          )}{" "}
          <span aria-hidden="true">·</span>{" "}
          {formatTimeAgo(video.createdAt, lang, text["Time and Views"])}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-text/75">
          <div className="size-6 shrink-0 rounded-full bg-[url('/pictures/avatar.png')] bg-cover" />
          <Link
            href={`/channel/${encodeURIComponent(video.author.id)}`}
            onClick={(event) => event.stopPropagation()}
            className="truncate hover:text-text"
          >
            {video.author.name}
          </Link>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-5 text-text/70">
          {video.description}
        </p>
      </div>
    </motion.article>
  );
}
