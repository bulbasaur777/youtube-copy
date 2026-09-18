"use client";

import { useState } from "react";
import { useAutoHideScrollbar } from "./hooks/useAutoHideScrollbar";
import Video from "./Video/Video";
import { useInfiniteScroll } from "./hooks/useInfiniteScrolls";
import { getVideos } from "./actions/getVideos";
import VideoSkeleton from "./Video/VideoSkeleton/VideoSkeleton";

import { getAllVideos } from "@/lib/data/videos";

type Props = {
  videosList: Awaited<ReturnType<typeof getAllVideos>>;
};

export default function Videos({ videosList }: Props) {
  const { scrollRef, showScrollbar } = useAutoHideScrollbar(1000);
  const [videos, setVideos] = useState(videosList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  // const fetchStreams = async () => {
  //   const streams = await getStreams(page + 1);
  //   if (streams.length > 0) {
  //     setPage((page) => page + 1);
  //     setStreams((prev) => [...prev, ...streams]);
  //   } else {
  //     setIsLastPage(true);
  //   }

  //   setLoading(false);
  // };

  // useInfiniteScroll({
  //   callback: () => {
  //     if (!loading && !isLastPage) {
  //       setLoading(true);
  //       fetchStreams();
  //     }
  //   },
  //   buffer: 500,
  // });

  return (
    <div
      ref={scrollRef}
      className={`flex flex-col gap-6 w-full bg-bg text-text px-2 sm:px-4 mt-5
        scrollbar-thumb-only ${
          showScrollbar ? "scrollbar-visible" : "scrollbar-hidden"
        }`}
    >
      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-x-2 gap-y-6 w-full bg-bg text-black
                  ${isLastPage && "mb-5"}
        `}
      >
        {videos.map((video, i) => {
          return (
            <Video
              key={video.id}
              title={video.title}
              author={video.author.name}
              duration={video.duration}
              bgColor={video.color}
            />
          );
        })}

        {loading && (
          <>
            {Array.from({ length: 16 }).map((_i, index) => {
              return (
                <VideoSkeleton
                  key={index}
                  opacity={3}
                  timer={50 + index * 50}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
