"use client";

import { use } from "react";
import { getAllVideos } from "@/lib/data/videos";
import type { Lang } from "@/types/language";
import VideoDetails from "../VideoDetails/VideoDetails";

type Video = Awaited<ReturnType<typeof getAllVideos>>[number];

export default function WatchVideoDetails({
  videoPromise,
  lang,
}: {
  videoPromise: Promise<Video | null>;
  lang: Lang;
}) {
  const mainVideo = use(videoPromise);
  return mainVideo ? <VideoDetails video={mainVideo} lang={lang} /> : null;
}
