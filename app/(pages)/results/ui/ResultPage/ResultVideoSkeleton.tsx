import Skeleton from "@/ui/Skeleton/Skeleton";

export default function ResultVideoSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4"
    >
      <Skeleton className="aspect-video w-full shrink-0 self-start rounded-xl sm:w-[min(42%,480px)]" />
      <div className="grid min-w-0 flex-1 grid-cols-[24px_minmax(0,1fr)] gap-x-2 sm:block">
        <Skeleton className="size-6 rounded-full sm:hidden" />
        <div
          className="flex min-w-0 animate-pulse flex-col gap-3 sm:pt-1"
          style={{ opacity: "30%" }}
        >
          <div className="h-4 w-[75%] rounded-sm bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)]" />
          <div className="h-4 w-[30%] rounded-sm bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)]" />
          <div className="mt-1 h-4 w-[35%] rounded-sm bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)]" />
          <div className="mt-1 hidden h-4 w-[64%] rounded-sm bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)] sm:block" />
        </div>
      </div>
    </div>
  );
}
