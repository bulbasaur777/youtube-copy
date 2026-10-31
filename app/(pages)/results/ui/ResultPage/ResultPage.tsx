"use client";

import { useCallback, useRef, useState } from "react";
import { searchVideos } from "@/lib/data/videos";
import { getAllTags } from "@/lib/data/tags";
import { Lang } from "@/types/language";
import Spacer from "@/ui/Main/Spacer/Spacer";
import { useInfiniteScroll } from "@/ui/Main/Videos/hooks/useInfiniteScrolls";
import Tags from "@/(pages)/watch/ui/Tags/Tags";
import ResultVideo from "./ResultVideo";
import ResultVideoSkeleton from "./ResultVideoSkeleton";
import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";

type Props = {
  videos: Awaited<ReturnType<typeof searchVideos>>;
  tags: Awaited<ReturnType<typeof getAllTags>>;
  lang: Lang;
  query: string;
};

const translations = { ru, ua, en } as const;
const pageSize = 10;

export function ResultPage({
  videos: initialVideos,
  tags,
  lang,
  query,
}: Props) {
  const text = translations[lang].Results;
  const [videos, setVideos] = useState(initialVideos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialVideos.length === pageSize);
  const [loadError, setLoadError] = useState(false);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setLoadError(false);

    try {
      const nextPage = page + 1;
      const nextVideos = await searchVideos(query, nextPage);
      setVideos((currentVideos) => [...currentVideos, ...nextVideos]);
      setPage(nextPage);
      setHasMore(nextVideos.length === pageSize);
    } catch (error) {
      console.error("Failed to load more search results:", error);
      setLoadError(true);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, page, query]);

  useInfiniteScroll({ callback: loadMore, buffer: 500 });

  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <Spacer />
      <main className="min-w-0 flex-1 px-4 pb-8 text-text sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex min-w-0 items-center gap-6 border-b border-text/10 py-3">
            <div className="min-w-0 flex-1">
              <Tags tags={tags} />
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-3"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6"
                />
              </svg>
              {text.filters}
            </button>
          </div>

          {videos.length > 0 ? (
            <>
              <div className="flex flex-col gap-5 pt-4">
                {videos.map((video, index) => (
                  <ResultVideo
                    key={video.id}
                    video={video}
                    lang={lang}
                    priority={index < 3}
                  />
                ))}
              </div>
              {loading && (
                <div
                  aria-label={text.loading}
                  aria-busy="true"
                  className="flex flex-col gap-5 py-5"
                  role="status"
                >
                  {[0, 1, 2].map((row) => (
                    <ResultVideoSkeleton key={row} />
                  ))}
                </div>
              )}
              {loadError && (
                <div className="flex items-center justify-center gap-3 py-6">
                  <p className="text-sm text-text/70" role="alert">
                    {text.loadError}
                  </p>
                  <button
                    type="button"
                    className="text-sm font-medium hover:underline"
                    onClick={loadMore}
                  >
                    {text.retry}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="py-12 text-center text-base text-text/80">
              {text.noResults}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
