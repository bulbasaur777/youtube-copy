import { cookies } from "next/headers";
import { Lang } from "@/types/language";

import { getAllTags } from "@/lib/data/tags";
import WatchPage from "./ui/WatchPage/WatchPage";
import { getVideoById, getVideos } from "@/lib/data/videos";

export default async function Watch({
  searchParams,
}: {
  searchParams: Promise<{ videoId?: string }>;
}) {
  const lang = ((await cookies()).get("lang")?.value || "ru") as Lang;
  const [{ videoId }, videosList, tags] = await Promise.all([
    searchParams,
    getVideos(1),
    getAllTags(),
  ]);
  const selectedVideo = videoId ? await getVideoById(videoId) : null;

  return (
    <WatchPage
      tags={tags}
      videosList={videosList}
      mainVideo={selectedVideo ?? videosList[0] ?? null}
      lang={lang}
    />
  );
}
