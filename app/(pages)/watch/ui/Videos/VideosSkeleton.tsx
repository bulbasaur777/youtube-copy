import VideoSkeleton from "./Video/VideoSkeleton/VideoSkeleton";

export default function VideosSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mt-3 flex w-full flex-col gap-6 bg-bg text-text"
    >
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-2 gap-y-6 bg-bg lg:grid-cols-1 lg:gap-y-2">
        {Array.from({ length: 10 }, (_, index) => (
          <VideoSkeleton key={index} opacity={30} />
        ))}
      </div>
    </div>
  );
}
