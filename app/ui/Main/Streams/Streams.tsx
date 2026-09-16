"use client";

import { useState } from "react";
import { useAutoHideScrollbar } from "./hooks/useAutoHideScrollbar";
import RegularStream from "./RegularStream/RegularStream";
import { useInfiniteScroll } from "./hooks/useInfiniteScrolls";
import { getStreams } from "./actions/getStreams";
import RegularStreamSkeleton from "./RegularStream/RegularStreamSkeleton/RegularStreamSkeleton";

type Stream = {
  title: string;
  streamer: string;
  time: number;
  game: string;
  lang: string;
  color: string;
};

type Props = {
  regularStreams: Stream[];
};

export default function Streams({ regularStreams }: Props) {
  const { scrollRef, showScrollbar } = useAutoHideScrollbar(1000);
  const [streams, setStreams] = useState(regularStreams);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchStreams = async () => {
    const streams = await getStreams(page + 1);
    if (streams.length > 0) {
      setPage((page) => page + 1);
      setStreams((prev) => [...prev, ...streams]);
    } else {
      setIsLastPage(true);
    }

    setLoading(false);
  };

  useInfiniteScroll({
    callback: () => {
      if (!loading && !isLastPage) {
        setLoading(true);
        fetchStreams();
      }
    },
    buffer: 500,
  });

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
        {streams.map(({ title, streamer, time, game, lang, color }, i) => {
          return (
            <RegularStream
              key={game + streamer + i}
              title={title}
              streamer={streamer}
              time={time}
              game={game}
              lang={lang}
              color={color}
            />
          );
        })}

        {loading && (
          <>
            {Array.from({ length: 16 }).map((_i, index) => {
              return (
                <RegularStreamSkeleton
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
