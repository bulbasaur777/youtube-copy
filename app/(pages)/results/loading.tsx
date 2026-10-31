import Spacer from "@/ui/Main/Spacer/Spacer";
import Skeleton from "@/ui/Skeleton/Skeleton";
import ResultVideoSkeleton from "./ui/ResultPage/ResultVideoSkeleton";

const resultRows = [0, 1, 2, 3];

export default function ResultsLoading() {
  return (
    <div className="absolute top-[56px] right-0 flex w-full">
      <Spacer />
      <main
        aria-busy="true"
        className="min-w-0 flex-1 px-4 pb-8 text-text sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div
            aria-hidden="true"
            className="flex min-w-0 items-center gap-6 border-b border-text/10 py-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              {[96, 76, 88, 104, 82, 92].map((width) => (
                <div
                  key={width}
                  className="h-7 shrink-0 animate-pulse rounded-lg bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)]"
                  style={{ width }}
                />
              ))}
            </div>
            <Skeleton className="h-9 w-24 shrink-0 rounded-full" />
          </div>

          <div className="flex flex-col gap-5 pt-4">
            {resultRows.map((row) => (
              <ResultVideoSkeleton key={row} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
