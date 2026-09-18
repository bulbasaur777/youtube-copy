import { useEffect } from "react";

type Args = {
  callback: () => void;
  buffer?: number;
  elem?: HTMLDivElement | Window;
};

export const useInfiniteScroll = ({ callback, buffer = 200, elem }: Args) => {
  useEffect(() => {
    const targetElem: HTMLDivElement | Window = elem ?? window;

    const handleScroll = () => {
      const scrollTop =
        targetElem instanceof Window
          ? targetElem.scrollY
          : (targetElem as HTMLElement).scrollTop;

      const clientHeight =
        targetElem instanceof Window
          ? targetElem.innerHeight
          : (targetElem as HTMLElement).clientHeight;

      const scrollHeight =
        targetElem instanceof Window
          ? document.documentElement.scrollHeight
          : (targetElem as HTMLElement).scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight - buffer) {
        console.log(
          "scrollTop: " +
            scrollTop +
            "; clientHeight: " +
            clientHeight +
            "; scrollHeight: " +
            scrollHeight,
          targetElem,
        );
        callback();
      }
    };

    targetElem.addEventListener("scroll", handleScroll);

    return () => {
      targetElem.removeEventListener("scroll", handleScroll);
    };
  }, [callback, buffer, elem]);
};
