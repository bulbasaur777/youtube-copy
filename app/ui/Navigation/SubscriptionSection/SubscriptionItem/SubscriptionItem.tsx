import { truncateText } from "@/libs/services/truncateText";

export default function SubscriptionItem({
  title,
  imgSrc,
  compactMode = false,
}: {
  title: string;
  imgSrc?: string;
  compactMode?: boolean;
}) {
  return (
    <div
      className={`group flex pl-3 py-2 hover:bg-gray-10 cursor-pointer text-[0.9rem] ${!compactMode ? "rounded-lg" : ""}`}
    >
      {imgSrc ? (
        <div
          className={`w-[24px] h-[24px] fill-current transition-colors rounded-full`}
          style={{ backgroundImage: `url(${imgSrc})` }}
        ></div>
      ) : (
        <div
          className={`flex justify-center items-center w-[25px] h-[25px] bg-gray-2 text-bg font-medium fill-current transition-colors rounded-full`}
        >
          {title[0]?.toUpperCase()}
        </div>
      )}

      <div
        className={`${compactMode ? "ml-3" : "ml-6"} text-text text-[14px] mt-[2px]`}
      >
        {compactMode ? truncateText(title, 32) : truncateText(title, 16)}
      </div>
    </div>
  );
}
