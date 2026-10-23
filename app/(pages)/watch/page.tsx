import { cookies } from "next/headers";
import { Suspense } from "react";
import { Lang } from "@/types/language";

import { getAllTags } from "@/lib/data/tags";
import WatchPage from "./ui/WatchPage/WatchPage";
import { getVideoById, getVideos } from "@/lib/data/videos";
import Tags from "./ui/Tags/Tags";
import Videos from "./ui/Videos/Videos";
import TagsSkeleton from "./ui/Tags/TagsSkeleton";
import VideosSkeleton from "./ui/Videos/VideosSkeleton";
import WatchMainVideo from "./ui/WatchPage/WatchMainVideo";
import WatchMainVideoSkeleton from "./ui/WatchPage/WatchMainVideoSkeleton";
import WatchComments from "./ui/WatchPage/WatchComments";
import WatchVideoDetails from "./ui/WatchPage/WatchVideoDetails";
import Skeleton from "@/ui/Skeleton/Skeleton";

async function WatchTags() {
  const tags = await getAllTags();
  return <Tags tags={tags} />;
}

async function WatchVideos({
  videosPromise,
  lang,
}: {
  videosPromise: ReturnType<typeof getVideos>;
  lang: Lang;
}) {
  const videosList = await videosPromise;
  return <Videos videosList={videosList} lang={lang} />;
}

export default async function Watch({
  searchParams,
}: {
  searchParams: Promise<{ videoId?: string }>;
}) {
  const [cookieStore, { videoId }] = await Promise.all([
    cookies(),
    searchParams,
  ]);
  const lang = (cookieStore.get("lang")?.value || "ru") as Lang;
  const videosPromise = getVideos(1);
  const mainVideoPromise = (async () => {
    const selectedVideo = videoId ? await getVideoById(videoId) : null;
    return selectedVideo ?? (await videosPromise)[0] ?? null;
  })();

  return (
    <WatchPage
      tagsContent={
        <Suspense fallback={<TagsSkeleton />}>
          <WatchTags />
        </Suspense>
      }
      videosContent={
        <Suspense fallback={<VideosSkeleton />}>
          <WatchVideos videosPromise={videosPromise} lang={lang} />
        </Suspense>
      }
      playerContent={
        <Suspense
          fallback={<WatchMainVideoSkeleton />}
        >
          <WatchMainVideo videoPromise={mainVideoPromise} />
        </Suspense>
      }
      detailsContent={
        <Suspense fallback={<Skeleton className="h-24 w-full" />}>
          <WatchVideoDetails videoPromise={mainVideoPromise} lang={lang} />
        </Suspense>
      }
      commentsContent={
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <WatchComments
            videoPromise={mainVideoPromise}
            lang={lang}
            hasVideo={Boolean(videoId)}
          />
        </Suspense>
      }
    />
  );
}
