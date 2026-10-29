"use client";

import { useEffect, type ReactNode } from "react";
import { useVideo } from "@/contexts/VideoContext";

import { useVideoLayout } from "@/contexts/VideoLayoutContext";

type Props = {
  videoId?: string;
  tagsContent: ReactNode;
  videosContent: ReactNode;
  playerContent: ReactNode;
  detailsContent: ReactNode;
  commentsContent: ReactNode;
};

export default function WatchPage({
  videoId,
  tagsContent,
  videosContent,
  playerContent,
  detailsContent,
  commentsContent,
}: Props) {
  const { isFullWidthVideo } = useVideo();
  const { mainVideoRef, sidebarRef } = useVideoLayout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  return (
    <div className="absolute inset-x-0 top-[56px] w-full overflow-x-clip">
      <main
        className={`relative grid min-h-[calc(100vh-56px)] w-full grid-cols-1 grid-rows-[auto_auto_auto] gap-y-4 rounded-tl-xl bg-bg pb-4 text-text lg:grid-rows-[auto_auto] lg:gap-y-0 ${
          isFullWidthVideo
            ? "lg:grid-cols-[calc(70vw_+_2rem)_minmax(0,1fr)] lg:gap-x-0"
            : "lg:grid-cols-[calc(70vw_+_1rem)_minmax(0,1fr)] lg:gap-x-4"
        }`}
      >
        <div
          className={
            isFullWidthVideo
              ? "contents"
              : "col-start-1 row-start-1 flex min-w-0 flex-col gap-4 pb-4 sm:px-4 sm:pt-4 lg:col-start-1 lg:row-start-1 lg:pr-0"
          }
        >
          <div
            aria-hidden="true"
            className={`hidden aspect-video max-sm:block ${
              isFullWidthVideo ? "col-span-1 row-start-1 lg:col-span-2" : ""
            }`}
          />
          <div
            ref={mainVideoRef}
            className={`max-sm:fixed max-sm:inset-x-0 max-sm:top-[56px] max-sm:z-[9] max-sm:w-full ${
              isFullWidthVideo ? "col-span-1 row-start-1 lg:col-span-2" : ""
            }`}
          >
            {playerContent}
          </div>

          <div
            className={
              isFullWidthVideo
                ? "col-start-1 row-start-2 flex min-w-0 flex-col gap-4 px-4 pb-4 lg:pt-4 lg:row-start-2 lg:pl-4"
                : "flex min-w-0 flex-col gap-4 px-4 sm:px-0"
            }
          >
            {detailsContent}
            {commentsContent}
          </div>
        </div>

        <div
          ref={sidebarRef}
          className={`min-w-0 bg-bg px-4 pb-4 lg:px-0 lg:pr-4 lg:pt-4 ${
            isFullWidthVideo
              ? "lg:col-start-2 lg:row-start-2"
              : "lg:col-start-2 lg:row-start-1"
          }`}
        >
          <div>{tagsContent}</div>
          <div>{videosContent}</div>
        </div>
      </main>
    </div>
  );
}
