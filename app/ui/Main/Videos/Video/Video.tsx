"use client";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import { useState, useRef, ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";
import {
  formatTime,
  formatTimeAgo,
  formatViews,
} from "@/lib/services/formatTime";
import VideoContexMenu from "./VideoContextMenu/VideoContextMenu";

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
  ...props
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBarHovered, setIsBarHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = translations[language];
  const classes = props.className;

  const handleMouseEnter = async () => {
    playTimeoutRef.current = setTimeout(async () => {
      setIsHovered(true);
      const video = videoRef.current;
      if (!video) return;

      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Video preview could not be played:", error);
      }
    }, 600);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    const video = videoRef.current;
    if (!video || !isPlaying) return;
    video.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <motion.div
      className="relative group cursor-pointer sm:p-1.5 pb-2 sm:pb-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      <div
        className={`relative bg-slate-500 aspect-[16/9] flex items-center justify-center rounded-xl overflow-hidden ${classes}`}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(100);
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Picture with animation */}
        <motion.div
          style={{
            backgroundImage: `url(${thumbnailUrl ?? "/pictures/picture-1.jpg"})`,
          }}
          className={`absolute inset-0 bg-cover bg-center ${isHovered ? "opacity-0" : "opacity-100"}`}
          // variants={{
          //   initial: { scale: 1 },
          //   hover: { scale: 1.15 }
          // }}
          // transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Time */}
        {!isBarHovered ? (
          <div className="absolute z-1 bottom-2 right-2">
            <div className="flex gap-1.5 justify-center items-center px-1.5 py-2.5 h-[16px] text-xs bg-black/60 rounded">
              <div className="text-text-2">
                {!isHovered
                  ? formatTime(duration)
                  : formatTime(
                      Math.round(duration - videoRef.current!.currentTime),
                    )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Dimmer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/15" />

        <div
          className="group/bar absolute bottom-0 left-0 right-0 pt-2 hover:pb-2 hover:px-3 transition-all duration-200"
          onMouseEnter={() => setIsBarHovered(true)}
          onMouseLeave={() => setIsBarHovered(false)}
        >
          <div
            className={`bg-white/30 z-[5] transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="h-[3px] group-hover/bar:h-[5px] bg-red-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stream Info */}
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
