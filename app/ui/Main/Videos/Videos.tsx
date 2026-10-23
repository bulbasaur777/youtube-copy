"use client";

import { useCallback, useState } from "react";
import { useAutoHideScrollbar } from "./hooks/useAutoHideScrollbar";
import Video from "./Video/Video";
import { useInfiniteScroll } from "./hooks/useInfiniteScrolls";
import VideoSkeleton from "./Video/VideoSkeleton/VideoSkeleton";
import { getAllVideos, getVideos } from "@/lib/data/videos";
import { Lang } from "@/types/language";

type Props = {
  videosList: Awaited<ReturnType<typeof getAllVideos>>;
  lang: Lang;
};

export default function Videos({ videosList, lang }: Props) {
  const { scrollRef, showScrollbar } = useAutoHideScrollbar(1000);
  const [videos, setVideos] = useState(videosList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(
    () => new Set(),
  );
  const [initialVideoIds] = useState(
    () => new Set(videosList.map((video) => video.id)),
  );
  const initialThumbnailsLoaded = [...initialVideoIds].every((id) =>
    loadedThumbnails.has(id),
  );

  const handleThumbnailLoaded = useCallback((id: string) => {
    setLoadedThumbnails((loaded) => {
      if (loaded.has(id)) return loaded;

      const next = new Set(loaded);
      next.add(id);
      return next;
    });
  }, []);

  const fetchStreams = async () => {
    const newVideos = await getVideos(page + 1);
    console.log(newVideos);

    if (newVideos.length > 0) {
      setPage((page) => page + 1);
      setVideos((prev) => [...prev, ...newVideos]);
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
        aria-busy={!initialThumbnailsLoaded}
        className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-x-2 gap-y-6 w-full bg-bg text-black
                  relative ${isLastPage && "mb-5"}
        `}
      >
        {videos.map((video, i) => {
          return (
            <Video
              key={video.id}
              className={!initialThumbnailsLoaded ? "invisible" : undefined}
              priority={i < initialVideoIds.size}
              id={video.id}
              title={video.title}
              author={video.author.name}
              duration={video.duration}
              bgColor={video.color}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={
                video.variants.find((variant) => variant.height === 720)?.url ??
                video.variants[0]?.url ??
                ""
              }
              previewVideoUrl={
                video.variants.find((variant) => variant.height === 144)?.url ??
                video.variants[0]?.url ??
                ""
              }
              viewsCounts={video.viewsCount}
              createdAt={video.createdAt}
              language={lang}
              onThumbnailLoaded={() => handleThumbnailLoaded(video.id)}
            />
          );
        })}

        {!initialThumbnailsLoaded && (
          <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-2 gap-y-6 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
            {Array.from({ length: initialVideoIds.size }, (_, index) => (
              <VideoSkeleton key={index} opacity={30} />
            ))}
          </div>
        )}

        {loading && (
          <>
            {Array.from({ length: 10 }).map((_i, index) => {
              return (
                <VideoSkeleton key={index} opacity={3} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
