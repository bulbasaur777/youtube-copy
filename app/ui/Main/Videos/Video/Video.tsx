"use client";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import { useState, ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";
import { formatTimeAgo, formatViews } from "@/lib/services/formatTime";
import VideoContexMenu from "./VideoContextMenu/VideoContextMenu";
import VideoPreview from "./VideoPreview/VideoPreview";

const translations = { ru, ua, en } as const;

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  author: string;
  duration: number;
  bgColor: string | null;
  thumbnailUrl: string | null;
  videoUrl: string;
  viewsCounts: number;
  createdAt: Date;
  language: Lang;
};

export default function Video({
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

  const t = translations[language];

  return (
    <motion.div
      className="relative group cursor-pointer sm:p-1.5 pb-2 sm:pb-4"
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
                   group-hover:scale-109 group-hover:opacity-100"
      ></div>

      <VideoPreview
        videoUrl={videoUrl}
        thumbnailUrl={thumbnailUrl}
        duration={duration}
        isHovered={isHovered}
      />

      {/* Video Info */}
      <div className="relative flex gap-1 items-start w-full mt-3.5 text-text z-1 select-none">
        <div className="size-9 bg-[url('/pictures/avatar.png')] mr-2 rounded-full min-w-[36px]" />
        <div className="flex flex-col">
          <div className="text-[1rem] font-medium pr-6">{title}</div>
          <div className="text-text/80 text-[0.9rem] hover:text-text/90 transition-all duration-100">
            {author}
          </div>
          <div className="text-text/80 text-[0.9rem]">
            {formatViews(viewsCounts ?? 0, language, t["Time and Views"].views)}{" "}
            <span className="font-bold">⋅</span>{" "}
            {formatTimeAgo(createdAt, language, t["Time and Views"])}
          </div>
        </div>
        <VideoContexMenu />
      </div>
    </motion.div>
  );
}
