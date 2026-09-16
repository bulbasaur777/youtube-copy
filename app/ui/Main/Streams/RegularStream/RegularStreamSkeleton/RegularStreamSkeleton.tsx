"use client";

import { useEffect, useState } from "react";

export default function RegularStreamSkeleton({
  opacity = 20,
  timer,
}: {
  opacity?: number;
  timer: number;
}) {
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsStart(true);
    }, timer);
  }, [timer]);

  return (
    <div
      className={`group cursor-pointer p-1.5 pb-4 duration-100! ${
        isStart ? "animate-pulse" : ""
      } `}
      style={{ opacity: `${opacity}%` }}
    >
      <div
        className={`relative bg-slate-500 aspect-[16/9] flex items-center justify-center overflow-hidden`}
      >
        {/* Картинка с анимацией */}
        <div className="absolute inset-0 bg-gray-4" />

        {/* Online indicator */}

        <div className="absolute z-1 bottom-1.5 left-1.5">
          <div className="text-text/80 text-sm"></div>
        </div>
      </div>

      {/* Stream Info */}
      <div className="flex gap-1.5 items-start w-full mt-2 text-text z-1 pointer-events-none">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="relative w-full flex items-center text-gray-4">
            <div className="size-5 bg-gray-4 mr-2 rounded-full" />
            <div className="w-[40%] bg-gray-4 h-[16px]"></div>
          </div>
          <div className="font-bold w-[80%] bg-gray-4 h-[16px] my-1.5"></div>
          <div className="flex gap-1">
            <Tag />
            <Tag />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag() {
  return (
    <div className="flex justify-center items-center text-xs bg-gray-4 w-[15%] h-[12px] px-1 mr-1"></div>
  );
}
