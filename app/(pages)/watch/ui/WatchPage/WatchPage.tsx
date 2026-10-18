"use client";

import { useMemo } from "react";
import MainVideo from "../MainVideo/MainVideo";
import { useVideo } from "@/contexts/VideoContext";

import { useVideoLayout } from "@/contexts/VideoLayoutContext";
import Tags from "../Tags/Tags";
import { getAllVideos } from "@/lib/data/videos";
import { Lang } from "@/types/language";
import Videos from "../Videos/Videos";
import type { VideoSourceVariant } from "@/hooks/useVideoController";
import Comments from "../Comments/Comments";
import VideoDetails from "../VideoDetails/VideoDetails";

type Props = {
  tags: { name: string }[];
  videosList: Awaited<ReturnType<typeof getAllVideos>>;
  mainVideo: Awaited<ReturnType<typeof getAllVideos>>[number] | null;
  lang: Lang;
};

export default function WatchPage({
  tags,
  videosList,
  mainVideo,
  lang,
}: Props) {
  const { isFullWidthVideo } = useVideo();
  const { mainVideoRef, sidebarRef } = useVideoLayout();
  const videoVariants = useMemo<VideoSourceVariant[]>(
    () =>
      mainVideo?.variants.map(({ videoId, height, url }) => ({
        videoId,
        height,
        url,
      })) ?? [],
    [mainVideo],
  );

  return (
    <div className="absolute right-0 top-[56px] w-full">
      <main className="relative grid w-full flex-1 grid-cols-[minmax(0,calc(70vw_+_1rem))_minmax(0,1fr)] grid-rows-[auto_auto] gap-x-4 bg-bg pb-1 text-text rounded-tl-xl">
        <div
          className={
            isFullWidthVideo
              ? "contents"
              : "col-start-1 row-start-1 flex flex-col gap-4 pb-4 pl-4 pt-4"
          }
        >
          <div
            ref={mainVideoRef}
            className={isFullWidthVideo ? "col-span-2 row-start-1" : ""}
          >
            {mainVideo ? (
              <MainVideo
                isFullWidth={isFullWidthVideo}
                videoId={mainVideo.id}
                videoVariants={videoVariants}
              />
            ) : (
              <div className="aspect-video rounded-2xl bg-black" />
            )}
          </div>

          <div
            className={
              isFullWidthVideo
                ? "col-start-1 row-start-2 flex flex-col gap-4 pb-4 pl-4 pt-4"
                : "flex flex-col gap-4"
            }
          >
            {mainVideo && <VideoDetails video={mainVideo} lang={lang} />}
            <Comments lang={lang} hasVideo={Boolean(mainVideo)} />
          </div>
        </div>

        <div
          ref={sidebarRef}
          className={`col-start-2 bg-bg pb-4 pr-4 pt-4 ${
            isFullWidthVideo ? "row-start-2" : "row-start-1"
          }`}
        >
          <div>
            <Tags tags={tags} />
          </div>
          <div>
            <Videos videosList={videosList} lang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}
