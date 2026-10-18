"use client";

import { useEffect, useState } from "react";

export default function VideoSkeleton({
  opacity = 20,
  timer,
}: {
  opacity?: number;
  timer: number;
}) {
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsStart(true);
    }, timer);

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div
      className={`flex relative group cursor-pointer duration-100! ${
        isStart ? "animate-pulse" : ""
      }`}
      style={{ opacity: `${opacity}%` }}
    >
      <div className="relative w-[60%] aspect-video overflow-hidden rounded-xl bg-gray-4">
        <div className="absolute inset-0 bg-gray-4" />
      </div>

      <div className="relative flex gap-1 items-start w-[40%] min-w-0 z-1 px-2">
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
