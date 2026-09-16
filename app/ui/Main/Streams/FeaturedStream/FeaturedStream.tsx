"use client";

import { ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import StreamContextMenu from "./StreamContextMenu/StreamContextMenu";
import TagsRow from "./TagsRow/TagsRow";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  streamer: string;
  online: number;
  game: string;
  lang: string;
};

export default function FeaturedStream({
  title,
  streamer,
  online,
  game,
  lang,
  ...props
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const classes = props.className;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-slate-500 aspect-[16/9] flex items-center justify-center cursor-pointer overflow-hidden ${classes}`}
    >
      <div className="w-full h-full bg-[url('/pictures/picture-3.jpg')] bg-cover bg-center">
        {/* Stream Info */}
        {!isHovered && (
          <div className="absolute bottom-0 left-0 flex gap-2 items-start w-full p-2 text-text-2 z-1 pointer-events-none bg-gradient-to-t from-black/50 to-transparent">
            <div>
              <div className="size-6 bg-[url('/pictures/avatar.png')] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="text-sm truncate">{title}</div>

              <TagsRow tags={[game, lang, "Something else", "And even more"]} />
              {/* <Tag title="Lineage II" />
                <Tag title="English" /> */}
            </div>
          </div>
        )}

        {/* Stream Info :hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0.25, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 flex flex-col gap-2 items-start w-full p-2 text-text-2 z-1 bg-gradient-to-t from-black/50 to-transparent"
            >
              <div className="flex items-center gap-1 pointer-events-none">
                <div className="size-6 bg-[url('/pictures/avatar.png')] rounded-full" />{" "}
                <div className="text-xs">{streamer}</div>
              </div>
              <div className="flex w-full flex-col gap-1.5 pointer-events-none">
                <div className="text-sm text-text-2/80">{title}</div>
                <div className="flex w-full gap-1">
                  <TagsRow tags={[game, lang]} />
                  {/* <Tag title={game} />
                  <Tag title={lang} /> */}
                </div>
              </div>
              <StreamContextMenu streamer={streamer} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online indicator */}
        <div className="absolute z-1 top-2 right-2">
          <div className="flex gap-1.5 justify-center items-center px-2 h-[16px] text-xs bg-black/50">
            <div className="size-1.5 bg-red-400 rounded-full"></div>
            <div className="text-text-2">{online}</div>
          </div>
        </div>

        {/* Dimmer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
      </div>
    </div>
  );
}
