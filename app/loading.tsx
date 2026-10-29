import Spacer from "./ui/Main/Spacer/Spacer";
import TagsSkeleton from "./ui/Main/Tags/TagsSkeleton";
import VideosSkeleton from "./ui/Main/Videos/VideosSkeleton";

export default function HomeLoading() {
  return (
    <div className="absolute top-[56px] right-0 flex w-full">
      <Spacer />
      <main className="relative w-full flex-1 rounded-tl-xl bg-bg px-1 pb-1 text-text">
        <TagsSkeleton />
        <VideosSkeleton />
      </main>
    </div>
  );
}
