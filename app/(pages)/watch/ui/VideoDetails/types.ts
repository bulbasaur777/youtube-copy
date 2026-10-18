import type { getAllVideos } from "@/lib/data/videos";
import type { Lang } from "@/types/language";

export type Video = Awaited<ReturnType<typeof getAllVideos>>[number];

export type VideoDetailsProps = {
  video: Video | null;
  lang: Lang;
};
