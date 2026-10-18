import { getAllTags } from "@/lib/data/tags";
import Spacer from "./Spacer/Spacer";
import Videos from "./Videos/Videos";
import Tags from "./Tags/Tags";
import { getVideos } from "@/lib/data/videos";
import { Lang } from "@/types/language";

export default async function Main({ lang }: { lang: Lang }) {
  const tags = await getAllTags();
  const videosList = await getVideos(1);

  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <Spacer />
      <main className="relative w-full flex-1 px-1 pb-1 bg-bg text-text rounded-tl-xl">
        <Tags tags={tags} />
        <Videos videosList={videosList} lang={lang} />
      </main>
    </div>
  );
}
