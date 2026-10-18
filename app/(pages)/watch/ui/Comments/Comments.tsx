"use client";

import { MdSort } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import useComments from "./hooks/useComments";
import CommentComposer from "./ui/CommentComposer";
import CommentItem from "./ui/CommentItem";
import type { Lang } from "@/types/language";
import { labels } from "../labels";
import type { VideoComment } from "./types";

type Props = {
  lang: Lang;
  hasVideo: boolean;
};

export default function Comments({ lang, hasVideo }: Props) {
  const state = useComments();
  const text = labels[lang];
  const comments: VideoComment[] = [
    { author: "Александр", age: 12, text: text.previewComment },
    { author: "Мария", age: 48, text: text.secondComment },
    { author: "Илья", age: 136, text: text.thirdComment },
  ];
  const sortedComments =
    state.commentSort === "newest" ? [...comments].reverse() : comments;

  return (
    <section className={`text-text ${hasVideo ? "mt-1" : "mt-2"}`}>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <h2 className="text-xl font-semibold">
          {comments.length} {text.comments}
        </h2>
        <div className="relative" ref={state.sortMenuRef}>
          <button
            type="button"
            aria-expanded={state.isSortMenuOpen}
            onClick={() => state.setIsSortMenuOpen((open) => !open)}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-[14.5px] font-medium hover:bg-gray"
          >
            <MdSort size={24} />
            {text.sort}
          </button>
          {state.isSortMenuOpen && (
            <div className="absolute left-0 top-full z-30 mt-1 min-w-52 overflow-hidden rounded-xl bg-bg py-2 text-text shadow-[0_4px_24px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
              {(["top", "newest"] as const).map((sort) => {
                const selected = state.commentSort === sort;
                return (
                  <button
                    type="button"
                    key={sort}
                    aria-pressed={selected}
                    onClick={() => {
                      state.setCommentSort(sort);
                      state.setIsSortMenuOpen(false);
                    }}
                    className="flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 text-left text-sm hover:bg-gray"
                  >
                    <span className="flex size-5 items-center justify-center">
                      {selected && <LuCheck size={17} />}
                    </span>
                    {sort === "top" ? text.topComments : text.newestFirst}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CommentComposer
        text={text}
        isFocused={state.isCommentFocused}
        onFocusChange={state.setIsCommentFocused}
      />

      <div className="mt-6 flex flex-col gap-5">
        {sortedComments.map((comment, index) => (
          <CommentItem
            key={comment.author}
            comment={comment}
            index={index}
            text={text}
          />
        ))}
      </div>
    </section>
  );
}
