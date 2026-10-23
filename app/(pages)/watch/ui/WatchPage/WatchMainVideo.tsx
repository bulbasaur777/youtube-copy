"use client";

import { useMemo, use } from "react";
import { useVideo } from "@/contexts/VideoContext";
import MainVideo from "../MainVideo/MainVideo";
import { getAllVideos } from "@/lib/data/videos";
import type { VideoSourceVariant } from "@/hooks/useVideoController";

type Video = Awaited<ReturnType<typeof getAllVideos>>[number];

export default function WatchMainVideo({
  videoPromise,
}: {
  videoPromise: Promise<Video | null>;
}) {
  const { isFullWidthVideo } = useVideo();
  const mainVideo = use(videoPromise);
  const videoVariants = useMemo<VideoSourceVariant[]>(
    () =>
      mainVideo?.variants.map(({ videoId, height, url }) => ({
        videoId,
        height,
        url,
      })) ?? [],
    [mainVideo],
  );

  if (!mainVideo) {
    return <div className="aspect-video rounded-2xl bg-black" />;
  }

  return (
    <MainVideo
      isFullWidth={isFullWidthVideo}
      videoId={mainVideo.id}
      videoVariants={videoVariants}
      thumbnailUrl={mainVideo.thumbnailUrl}
      duration={mainVideo.duration}
    />
  );
}
