"use client";

import { ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import StreamContextMenu from "./StreamContextMenu/StreamContextMenu";
import TagsRow from "./TagsRow/TagsRow";
import { formatTime } from "@/libs/services/formatTime";
import MenuIcon from "./icons/MenuIcon";
import VideoContexMenu from "./VideoContextMenu/VideoContextMenu";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  streamer: string;
  time: number;
  game: string;
  lang: string;
  color: string;
};

export default function RegularStream({
  title,
  streamer,
  time,
  game,
  lang,
  color,
  ...props
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const classes = props.className;

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
          backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl
                   w-[95%] h-[95%] opacity-0 transition-all duration-300
                   group-hover:scale-109 group-hover:opacity-100"
      ></div>
      <div
        className={`relative bg-slate-500 aspect-[16/9] flex items-center justify-center rounded-xl overflow-hidden ${classes}`}
      >
        {/* Picture with animation */}
        <motion.div
          className="hidden sm:block absolute inset-0 bg-[url('/pictures/picture-1.jpg')] bg-cover bg-center"
          // variants={{
          //   initial: { scale: 1 },
          //   hover: { scale: 1.15 }
          // }}
          // transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Picture without animation */}
        <div className="sm:hidden absolute inset-0 bg-[url('/pictures/picture-1.jpg')] bg-cover bg-center" />

        {/* Time */}
        <div className="absolute z-1 bottom-2 right-2">
          <div className="flex gap-1.5 justify-center items-center px-1.5 py-2.5 h-[16px] text-xs bg-black/60 rounded">
            <div className="text-text-2">{formatTime(time)}</div>
          </div>
        </div>

        {/* Dimmer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/15" />
      </div>

      {/* Stream Info */}
      <div className="relative flex gap-1 items-start w-full mt-3.5 text-text z-1 select-none">
        <div className="size-9 bg-[url('/pictures/avatar.png')] mr-2 rounded-full min-w-[36px]" />
        <div className="flex flex-col">
          <div className="text-[1rem] font-medium pr-6">
            Новости дня | 16 июля 2026 г. — вечерний выпуск
          </div>
          <div className="text-text/80 text-[0.9rem] hover:text-text/90 transition-all duration-100">
            Euronews по-русски
          </div>
          <div className="text-text/80 text-[0.9rem]">
            943 просмотра <span className="font-bold">⋅</span> 54 минуты назад
          </div>
        </div>
        <VideoContexMenu />
      </div>
    </motion.div>
  );
}
