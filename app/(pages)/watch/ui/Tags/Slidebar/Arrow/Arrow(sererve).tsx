import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { createPortal } from "react-dom";

export default function Arrow({
  onClick,
  direction,
  parent,
}: {
  onClick: () => void;
  direction: "left" | "right";
  parent?: HTMLElement | null;
}) {
  if (!parent) {
    return (
      <div
        className={`flex absolute top-0 z-0 w-[55px] ${
          direction === "left" ? "left-0 justify-start" : "right-0 justify-end"
        }`}
      >
        <div
          onClick={onClick}
          className={`h-[52px] w-[10px] md:w-[36px] cursor-pointer hidden md:flex items-center justify-center transition-all duration-300
                bg-bg-main hover:bg-bg-main text-text text-[1.2em] border-[3px] border-gray-2/50 hover:border-gray-2 select-none `}
        >
          {direction === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>
    );
  }

  return createPortal(
    <div
      className={`flex absolute top-0 z-0 w-[55px] ${
        direction === "left" ? "-left-8 justify-start" : "-right-8 justify-end"
      }`}
    >
      <div className="absolute -top-3 w-full h-[80px] bg-bg-main -z-1 blur-sm hidden md:block"></div>
      <div
        onClick={onClick}
        className={`h-[52px] w-[10px] md:w-[36px] cursor-pointer hidden md:flex items-center justify-center transition-all duration-300
                bg-text/15 hover:bg-text/10 text-text/80 text-[1.2em] border-[1px] border-gray-2/50 select-none rounded-sm `}
      >
        {direction === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </div>
    </div>,
    parent,
  );
}
