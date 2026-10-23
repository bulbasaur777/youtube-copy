export default function VideoSkeleton({
  opacity = 20,
}: {
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative group flex animate-pulse cursor-pointer flex-col pb-2 lg:flex-row"
      style={{ opacity: `${opacity}%` }}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-4 lg:w-[60%]">
        <div className="absolute inset-0 bg-gray-4" />
      </div>

      <div className="relative z-1 mt-3.5 flex w-full min-w-0 items-start gap-1 px-1 lg:mt-0 lg:w-[40%] lg:px-2">
        <div className="mr-2 size-9 min-w-9 rounded-full bg-gray-4 lg:hidden" />
        <div className="flex gap-y-1 min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-1">
            <div className="h-3.5 w-[95%] rounded-sm bg-gray-4" />
            <div className="h-3.5 w-[72%] rounded-sm bg-gray-4" />
            <div className="hidden xl:block h-3.5 w-[84%] rounded-sm bg-gray-4" />
          </div>
          <div className="h-2.5 w-[42%] rounded-sm bg-gray-4" />
          <div className="h-2.5 w-[64%] rounded-sm bg-gray-4" />
        </div>
        <div className="size-6 shrink-0 rounded-full bg-gray-4 opacity-0" />
      </div>
    </div>
  );
}
