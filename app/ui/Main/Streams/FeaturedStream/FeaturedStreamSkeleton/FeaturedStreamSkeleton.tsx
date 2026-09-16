"use client";

export default function FeaturedStreamSkeleton() {
  return (
    <div
      className={`relative bg-slate-500 aspect-[16/9] flex items-center justify-center cursor-pointer overflow-hidden`}
    >
      <div className="w-full h-full bg-[url('/pictures/picture-3.jpg')] bg-cover bg-center">
        <div className="absolute bottom-0 left-0 flex gap-2 items-start w-full p-2 text-text z-1 pointer-events-none bg-gradient-to-t from-black/50 to-transparent">
          <div>
            <div className="size-6 bg-[url('/pictures/avatar.png')] rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-sm"></div>
            <div className="flex gap-1">
              <Tag />
              <Tag />
            </div>
          </div>
        </div>

        {/* Online indicator */}
        <div className="absolute z-1 top-2 right-2">
          <div className="flex gap-1.5 justify-center items-center px-2 h-[16px] text-xs bg-black/50">
            <div className="size-1.5 bg-red-400 rounded-full"></div>
            <div className="text-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag() {
  return (
    <div className="flex justify-center items-center text-xs bg-black/50 px-1 mr-1"></div>
  );
}
