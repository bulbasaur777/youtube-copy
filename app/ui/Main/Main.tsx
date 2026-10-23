import { Suspense } from "react";
import { getAllTags } from "@/lib/data/tags";
import { getVideos } from "@/lib/data/videos";
import { Lang } from "@/types/language";
import Spacer from "./Spacer/Spacer";
import Videos from "./Videos/Videos";
import VideosSkeleton from "./Videos/VideosSkeleton";
import Tags from "./Tags/Tags";
import TagsSkeleton from "./Tags/TagsSkeleton";

async function VideosFeed({ lang }: { lang: Lang }) {
  const videosList = await getVideos(1);

  return <Videos videosList={videosList} lang={lang} />;
}

async function TagsFeed() {
  const tags = await getAllTags();

  return <Tags tags={tags} />;
}

export default function Main({ lang }: { lang: Lang }) {
  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <Spacer />
      <main className="relative w-full flex-1 px-1 pb-1 bg-bg text-text rounded-tl-xl">
        <Suspense fallback={<TagsSkeleton />}>
          <TagsFeed />
        </Suspense>
        <Suspense fallback={<VideosSkeleton />}>
          <VideosFeed lang={lang} />
        </Suspense>
      </main>
    </div>
  );
}
