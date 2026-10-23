export default function VideoSkeleton({ opacity = 20 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="group animate-pulse cursor-pointer pb-2 sm:p-1.5 sm:pb-4"
      style={{ opacity: `${opacity}%` }}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-4">
        <div className="absolute inset-0 bg-gray-4" />
      </div>

      <div className="relative z-1 mt-3.5 flex w-full items-start gap-1">
        <div className="mr-2 size-9 min-w-9 rounded-full bg-gray-4" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-4 w-[75%] rounded bg-gray-4" />
          <div className="h-3 w-[25%] rounded bg-gray-4" />
          <div className="h-3 w-[35%] rounded bg-gray-4" />
        </div>
      </div>
    </div>
  );
}
