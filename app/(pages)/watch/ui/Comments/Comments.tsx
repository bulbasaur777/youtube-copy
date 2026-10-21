"use client";

import { MdSort } from "react-icons/md";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useVideoLayout } from "@/contexts/VideoLayoutContext";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelTop, setPanelTop] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { mainVideoRef } = useVideoLayout();
  const text = labels[lang];
  const comments: VideoComment[] = [
    { author: "Александр", age: 12, text: text.previewComment },
    { author: "Мария", age: 48, text: text.secondComment },
    { author: "Илья", age: 136, text: text.thirdComment },
  ];
  const sortedComments =
    state.commentSort === "newest" ? [...comments].reverse() : comments;
  const previewComment = sortedComments[0];

  useEffect(
    () => () => {
      if (closeTimeout.current !== null) clearTimeout(closeTimeout.current);
    },
    [],
  );

  useEffect(() => {
    if (!isExpanded) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      const previousDocumentOverflow = document.documentElement.style.overflow;
      const previousBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      return () => {
        document.documentElement.style.overflow = previousDocumentOverflow;
        document.body.style.overflow = previousBodyOverflow;
      };
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;

    const updatePanelTop = () => {
      const isLandscapeMobile = window.matchMedia(
        "(orientation: landscape) and (max-height: 600px)",
      ).matches;

      if (isLandscapeMobile) {
        setPanelTop(56);
        return;
      }

      const videoBottom =
        mainVideoRef.current?.getBoundingClientRect().bottom ?? 0;
      setPanelTop(Math.max(0, Math.min(videoBottom, window.innerHeight - 160)));
    };

    updatePanelTop();
    window.addEventListener("resize", updatePanelTop);
    window.addEventListener("scroll", updatePanelTop, true);
    return () => {
      window.removeEventListener("resize", updatePanelTop);
      window.removeEventListener("scroll", updatePanelTop, true);
    };
  }, [isExpanded, mainVideoRef]);

  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    if (closeTimeout.current !== null) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    dragStartY.current = event.clientY;
    setDragOffset(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    setDragOffset(Math.max(0, event.clientY - dragStartY.current));
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;
    const dragDistance = Math.max(0, event.clientY - dragStartY.current);
    dragStartY.current = null;
    setIsDragging(false);

    if (dragDistance > 80) {
      setDragOffset(window.innerHeight - (panelTop ?? 0));
      closeTimeout.current = setTimeout(() => {
        setIsExpanded(false);
        setDragOffset(0);
        closeTimeout.current = null;
      }, 300);
    } else {
      setDragOffset(0);
    }
  };

  const handleExpandComments = () => {
    if (
      window.matchMedia("(min-width: 640px) and (max-width: 1023px)").matches
    ) {
      window.scrollTo(0, 0);
    }
    setIsExpanded(true);
  };

  return (
    <section
      style={
        isExpanded
          ? {
              ...(panelTop !== null ? { top: `${panelTop}px` } : {}),
              transform: `translateY(${dragOffset}px)`,
            }
          : undefined
      }
      className={`text-text ${
        isExpanded
          ? `fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl border-t border-gray-5 bg-bg shadow-[0_-8px_30px_rgba(0,0,0,0.18)] ${isDragging ? "transition-none" : "transition-transform duration-300 ease-out"} lg:static lg:block lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:transform-none`
          : `${hasVideo ? "mt-1" : "mt-2"}`
      }`}
    >
      {!isExpanded && (
        <button
          type="button"
          aria-expanded={false}
          aria-controls="video-comments-list"
          onClick={handleExpandComments}
          className="flex w-full cursor-pointer flex-col gap-2 rounded-xl bg-gray-10 p-4 text-left lg:hidden"
        >
          <span className="flex items-center justify-between text-sm">
            <span>
              <span className="font-semibold">{text.commentsTitle}</span>{" "}
              <span>{comments.length}</span>
            </span>
            <LuChevronDown size={20} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5c6bc0] text-sm text-white"
            >
              {previewComment.author.slice(0, 1)}
            </span>
            <span className="min-w-0 truncate text-sm text-text/80">
              {previewComment.text}
            </span>
          </span>
        </button>
      )}

      <div
        id="video-comments-list"
        className={`${isExpanded ? "flex min-h-0 flex-1 flex-col" : "hidden"} lg:block`}
      >
        <div
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={() => {
            dragStartY.current = null;
            setIsDragging(false);
            setDragOffset(0);
          }}
          className="flex shrink-0 cursor-grab touch-none flex-col items-center gap-1.5 px-4 pb-2 pt-3 active:cursor-grabbing lg:hidden"
        >
          <span className="h-1 w-9 rounded-full bg-text/25" />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 gap-y-3 mt-3 mb-1 lg:mt-0 lg:mb-0">
          <h2 className="text-md lg:text-xl font-semibold ml-4 lg:ml-0">
            {comments.length} {text.comments}
          </h2>
          <div className="relative" ref={state.sortMenuRef}>
            <button
              type="button"
              aria-expanded={state.isSortMenuOpen}
              onClick={() => state.setIsSortMenuOpen((open) => !open)}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-md lg:text-[14.5px] font-medium hover:bg-gray"
            >
              <MdSort size={24} />
              <div className="hidden sm:block">{text.sort}</div>
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
          <button
            type="button"
            aria-label={text.collapseComments}
            aria-expanded={isExpanded}
            aria-controls="video-comments-list"
            onClick={() => setIsExpanded(false)}
            className="ml-auto inline-flex size-10 mr-4 cursor-pointer items-center justify-center rounded-full hover:bg-gray lg:hidden"
          >
            <LuX size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-4 pb-6 lg:flex-none lg:overflow-visible lg:px-0 lg:pb-0">
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
        </div>
      </div>
    </section>
  );
}
