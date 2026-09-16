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
      className={`group flex items-center justify-center absolute top-0 z-1 w-[40px] h-[40px] rounded-full hover:bg-gray-2 duration-300 ${
        direction === "left" ? "-left-3" : "-right-3"
      }`}
    >
      <div
        onClick={onClick}
        className={`h-[32px] w-[32px] cursor-pointer hidden md:flex items-center justify-center transition-all duration-300
                bg-bg group-hover:bg-bg/20 text-text text-[1.2em] select-none rounded-full`}
      >
        {direction === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </div>
    </div>,
    parent,
  );
}
