"use client";

import {
  LuDownload,
  LuEllipsis,
  LuShare2,
  LuThumbsDown,
  LuThumbsUp,
} from "react-icons/lu";
import { formatViewCount } from "../../Videos/Video/helpers/formatVideoMetadata";
import type { Lang } from "@/types/language";
import type { VideoActionsState } from "../hooks/useVideoDetails";
import type { WatchLabels } from "@/types/watchLabels";
import type { Video } from "../types";
import SaveMenu from "./SaveMenu";

type Props = {
  video: Video;
  lang: Lang;
  text: WatchLabels;
  state: VideoActionsState;
};

export default function VideoActions({ video, lang, text, state }: Props) {
  const {
    isSubscribed,
    setIsSubscribed,
    isLiked,
    setIsLiked,
    isDisliked,
    setIsDisliked,
  } = state;

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c62828] text-[1.1em] text-white"
        >
          {video.author.name.slice(0, 1).toLocaleUpperCase(lang)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="truncate text-base font-medium leading-5">
              {video.author.name}
            </span>
          </div>
          <div className="text-xs leading-4 text-text/60">
            {text.subscriberCount} {text.subscribers}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSubscribed((subscribed) => !subscribed)}
          className={`ml-1 h-10 shrink-0 cursor-pointer rounded-full px-4 text-[14.5px] font-medium transition-colors ${
            isSubscribed
              ? "bg-gray text-text hover:bg-gray/80"
              : "bg-text text-bg hover:bg-text/80"
          }`}
        >
          {isSubscribed ? text.subscribed : text.subscribe}
        </button>
      </div>

      <div className="flex max-w-full flex-wrap items-center gap-2">
        <div className="flex h-10 shrink-0 items-center overflow-hidden rounded-full bg-gray">
          <button
            type="button"
            aria-pressed={isLiked}
            onClick={() => {
              setIsLiked((liked) => !liked);
              setIsDisliked(false);
            }}
            className={`flex h-full cursor-pointer items-center gap-2 px-3 text-[14.5px] font-medium transition-colors hover:bg-text/10 ${
              isLiked ? "text-[#065fd4] dark:text-[#3ea6ff]" : ""
            }`}
          >
            <LuThumbsUp
              size={19}
              strokeWidth={1.8}
              fill={isLiked ? "currentColor" : "none"}
              className="text-green-700"
            />
            <span className={isLiked ? "text-green-700" : ""}>
              {formatViewCount(
                Math.max(
                  0,
                  (video.likesCount ?? 0) +
                    Number(isLiked) -
                    Number(isDisliked),
                ),
                lang,
              )}
            </span>
          </button>
          <span className="h-5 w-px bg-text/20" />
          <button
            type="button"
            aria-label="Не нравится"
            aria-pressed={isDisliked}
            onClick={() => {
              setIsDisliked((disliked) => !disliked);
              setIsLiked(false);
            }}
            className={`flex h-full cursor-pointer items-center gap-2 px-3 text-[14.5px] font-medium transition-colors hover:bg-text/10 ${
              isDisliked ? "text-[#065fd4] dark:text-[#3ea6ff]" : ""
            }`}
          >
            <span className={isDisliked ? "text-red-500" : ""}>
              {formatViewCount(
                Math.max(
                  0,
                  (video.dislikesCount ?? 0) +
                    Number(isDisliked) -
                    Number(isLiked),
                ),
                lang,
              )}
            </span>
            <LuThumbsDown
              size={19}
              strokeWidth={1.8}
              fill={isDisliked ? "currentColor" : "none"}
              className="text-red-500"
            />
          </button>
        </div>
        <button
          type="button"
          className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gray px-3 text-[14.5px] font-medium hover:bg-text/10"
        >
          <LuShare2 size={19} strokeWidth={1.8} />
          {text.share}
        </button>
        <button
          type="button"
          className="hidden h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gray px-3 text-[14.5px] font-medium hover:bg-text/10 sm:flex"
        >
          <LuDownload size={19} strokeWidth={1.8} />
          {text.download}
        </button>
        <SaveMenu text={text} state={state} />
        <button
          type="button"
          aria-label={text.more}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray hover:bg-text/10 cursor-pointer"
        >
          <LuEllipsis size={20} />
        </button>
      </div>
    </div>
  );
}
