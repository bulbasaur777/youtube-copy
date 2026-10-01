"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "@/contexts/NavbarContext";
import { useModalNavbar } from "@/contexts/ModalNavbarContext";
import YouTubeIcon from "./YouTubeIcon/YouTubeIcon";
import { LuMenu } from "react-icons/lu";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  isNavigation?: boolean;
};

export default function YouTubeIconGroup({ isNavigation = false }: Props) {
  const pathname = usePathname();
  const { windowSize } = useWindowSize();

  const { changeNavbar } = useNavbar();
  const { changeModalNavbar } = useModalNavbar();

  const isWatchPage = pathname.startsWith("/watch");

  const handleClick = () => {
    if (isWatchPage || windowSize! < 640) {
      changeModalNavbar();
    } else {
      changeNavbar();
    }
  };

  return (
    <div
      className={`relative flex items-center h-[100%] w-[32.25%] min-w-[165px] ${isNavigation ? "!w-full ml-1 mt-0.5 pb-4" : ""}`}
    >
      <LuMenu
        onClick={handleClick}
        className={`flex justify-start size-10 mr-4 ${isNavigation ? "sm:ml-2" : ""} font-bold cursor-pointer hover:bg-gray-9 rounded-full px-0 sm:px-2 py-2`}
      />{" "}
      <Link href="/">
        <YouTubeIcon />
      </Link>
      <div className="h-[44px] text-[0.6em] pl-1 pt-1.5 text-gray-4">UA</div>
    </div>
  );
}
