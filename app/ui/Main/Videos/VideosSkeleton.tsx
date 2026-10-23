import VideoSkeleton from "./Video/VideoSkeleton/VideoSkeleton";

export default function VideosSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mt-5 flex w-full flex-col gap-6 bg-bg px-2 text-text sm:px-4"
    >
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-2 gap-y-6 bg-bg md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
        {Array.from({ length: 10 }, (_, index) => (
          <VideoSkeleton key={index} opacity={30} />
        ))}
      </div>
    </div>
  );
}
