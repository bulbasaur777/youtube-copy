import {
  LuEllipsisVertical,
  LuReply,
  LuThumbsDown,
  LuThumbsUp,
} from "react-icons/lu";
import type { WatchLabels } from "@/types/watchLabels";
import type { VideoComment } from "../types";

const commentColors = ["bg-[#5c6bc0]", "bg-[#00897b]", "bg-[#8e24aa]"];
const likeCounts = ["24", "8", "3"];

type Props = {
  comment: VideoComment;
  index: number;
  text: WatchLabels;
};

export default function CommentItem({ comment, index, text }: Props) {
  return (
    <article className="flex items-start gap-3">
      <div
        aria-hidden="true"
        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[1.1em] text-white ${commentColors[index]}`}
      >
        {comment.author.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[13px] font-medium">
            @{comment.author.toLocaleLowerCase()}
          </span>
          <span className="text-xs text-text/60">
            {comment.age} {text.minutesAgo}
          </span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm leading-5">
          {comment.text}
        </p>
        <div className="mt-2 flex items-center gap-1 text-text/80">
          <button
            type="button"
            aria-label="Нравится комментарий"
            className="flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-2 hover:bg-gray"
          >
            <LuThumbsUp size={17} strokeWidth={1.8} />
            <span className="text-xs">{likeCounts[index]}</span>
          </button>
          <button
            type="button"
            aria-label="Не нравится комментарий"
            className="cursor-pointer rounded-full p-2 hover:bg-gray"
          >
            <LuThumbsDown size={17} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="ml-2 inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-xs font-medium hover:bg-gray"
          >
            {text.reply}
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label={text.more}
        className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-gray cursor-pointer"
      >
        <LuEllipsisVertical size={22} />
      </button>
    </article>
  );
}
