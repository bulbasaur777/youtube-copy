"use client";

import { use } from "react";
import { getAllVideos } from "@/lib/data/videos";
import type { Lang } from "@/types/language";
import Comments from "../Comments/Comments";

type Video = Awaited<ReturnType<typeof getAllVideos>>[number];

export default function WatchComments({
  videoPromise,
  lang,
  hasVideo,
}: {
  videoPromise: Promise<Video | null>;
  lang: Lang;
  hasVideo: boolean;
}) {
  use(videoPromise);
  return <Comments lang={lang} hasVideo={hasVideo} />;
}
