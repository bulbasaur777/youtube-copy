import TagsRow from "./TagsRow/TagsRow";

export default function HeroStream() {
  return (
    <div className="relative w-full sm:w-[67%] xl:w-[50%] 2xl:w-[39.8%] aspect-[16/9] bg-black text-black cursor-pointer">
      {/* Video Info */}
      <div className="absolute top-0 left-0 flex w-full p-3 text-text bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-center w-[48px] h-[48px] mr-4 bg-[url('/pictures/avatar.png')] rounded-full"></div>

        <div className="flex flex-1 flex-col justify-center min-w-0">
          <div className="flex w-full justify-between items-start min-w-0">
            <div className="truncate min-w-0 flex-1 mr-2 text-text-2">
              В СЕТИ DAYZ | НАСЛЕДИЕ СТАЛКЕР RPG PVE
            </div>

            <div className="flex gap-1.5 justify-center items-center px-2 h-[16px] text-text-2 text-xs bg-black/40 shrink-0">
              <div className="size-1.5 bg-red-400 rounded-full"></div>
              <div>432</div>
            </div>
          </div>

          <div className="flex text-sm flex-wrap">
            <div className="mr-1 text-text-2">
              LeFrancuz <span className="font-bold">·</span>
            </div>

            <TagsRow tags={["DayZ", "Russian", "Game Drop"]} />
          </div>
        </div>
      </div>

      {/* Video */}
      <video
        src="./videos/futurama.mp4"
        className="w-full h-full"
        controls
      ></video>
    </div>
  );
}
