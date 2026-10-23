"use client";

import { useVideo } from "@/contexts/VideoContext";
import TagsSkeleton from "./ui/Tags/TagsSkeleton";
import VideosSkeleton from "./ui/Videos/VideosSkeleton";
import WatchMainVideoSkeleton from "./ui/WatchPage/WatchMainVideoSkeleton";

export default function WatchLoading() {
  const { isFullWidthVideo } = useVideo();

  return (
    <div className="absolute inset-x-0 top-[56px] w-full">
      <main
        className={`relative grid min-h-[calc(100vh-56px)] w-full grid-cols-1 grid-rows-[auto_auto_auto] gap-y-4 rounded-tl-xl bg-bg pb-4 text-text lg:grid-rows-[auto_auto] lg:gap-x-4 lg:gap-y-0 ${
          isFullWidthVideo
            ? "lg:grid-cols-[minmax(0,70vw)_minmax(0,1fr)]"
            : "lg:grid-cols-[minmax(0,calc(70vw_+_1rem))_minmax(0,1fr)]"
        }`}
      >
        <section
          className={`flex min-w-0 flex-col gap-4 pb-4 sm:px-4 sm:pt-4 lg:col-start-1 lg:pr-0 ${
            isFullWidthVideo
              ? "contents"
              : "lg:row-start-1"
          }`}
        >
          <div
            aria-hidden="true"
            className={`hidden aspect-video max-sm:block ${
              isFullWidthVideo ? "lg:col-span-2 lg:row-start-1" : ""
            }`}
          />
          <div
            className={`w-full max-sm:fixed max-sm:inset-x-0 max-sm:top-[56px] max-sm:z-[9] ${
              isFullWidthVideo ? "lg:col-span-2 lg:row-start-1" : ""
            }`}
          >
            <WatchMainVideoSkeleton />
          </div>
          {isFullWidthVideo && (
            <div className="min-h-24 lg:col-start-1 lg:row-start-2" />
          )}
        </section>
        <aside
          className={`min-w-0 bg-bg px-4 pb-4 lg:col-start-2 lg:px-0 lg:pr-4 lg:pt-4 ${
            isFullWidthVideo ? "lg:row-start-2" : "lg:row-start-1"
          }`}
        >
          <TagsSkeleton />
          <VideosSkeleton />
        </aside>
      </main>
    </div>
  );
}
