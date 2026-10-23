"use client";

import { Lang } from "@/types/language";

import { useState, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  formatCompactTimeAgo,
  formatViewCount,
} from "./helpers/formatVideoMetadata";
import VideoContexMenu from "./VideoContextMenu/VideoContextMenu";
import VideoPreview from "./VideoPreview/VideoPreview";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = ComponentPropsWithoutRef<"div"> & {
  id: string;
  title: string;
  author: string;
  duration: number;
  bgColor: string | null;
  thumbnailUrl: string | null;
  videoUrl: string;
  previewVideoUrl: string | null;
  viewsCounts: number;
  createdAt: Date;
  language: Lang;
};

export default function Video({
  id,
  title,
  author,
  duration,
  bgColor,
  thumbnailUrl,
  videoUrl,
  viewsCounts,
  createdAt,
  language,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const { windowSize } = useWindowSize();
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/watch?videoId=${encodeURIComponent(id)}`);
  };

  return (
    <motion.div
      className="relative group flex cursor-pointer flex-col lg:flex-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover="hover"
      initial="initial"
    >
      <div
        style={{
          backgroundColor: `color-mix(in srgb, ${bgColor ?? "gray"} 10%, transparent)`,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl
                   w-[95%] h-[95%] opacity-0 transition-all duration-300
                   group-hover:scale-x-108 group-hover:scale-y-112 group-hover:opacity-100"
      ></div>

      <VideoPreview
        videoId={id}
        videoUrl={videoUrl}
        thumbnailUrl={thumbnailUrl}
        duration={duration}
        isHovered={isHovered}
      />

      {/* Video Info */}
      <div
        className="relative z-1 mt-3.5 flex w-full min-w-0 items-start gap-1 px-1 text-text select-none lg:mt-0 lg:w-[40%] lg:px-2"
        onClick={handleCardClick}
      >
        <div className="mr-2 size-9 min-w-9 rounded-full bg-[url('/pictures/avatar.png')] bg-cover lg:hidden" />
        <div className="flex gap-y-0 lg:gap-y-1  min-w-0 flex-1 flex-col">
          <Link
            href={`/watch?videoId=${encodeURIComponent(id)}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="text-[1rem] font-medium lg:text-sm"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: windowSize! > 1280 ? 3 : 2,
                overflow: "hidden",
              }}
            >
              {title}
            </div>
          </Link>
          <div
            className="text-[0.9rem] text-text/80 transition-all duration-100 hover:text-text/90 lg:text-xs"
            onClick={(event) => event.stopPropagation()}
          >
            {author}
          </div>
          <div className="min-w-0 truncate text-[0.9rem] text-text/80 lg:text-xs">
            {formatViewCount(viewsCounts ?? 0, language)}{" "}
            <span className="font-bold">⋅</span>{" "}
            {formatCompactTimeAgo(createdAt, language)}
          </div>
        </div>
        <div
          className="pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
          onClick={(event) => event.stopPropagation()}
        >
          <VideoContexMenu />
        </div>
      </div>
    </motion.div>
  );
}
