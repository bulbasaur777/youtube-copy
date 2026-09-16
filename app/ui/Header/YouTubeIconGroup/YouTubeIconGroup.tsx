"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import YouTubeIcon from "./YouTubeIcon/YouTubeIcon";
import { LuMenu } from "react-icons/lu";

type Props = {
  isNavigation?: boolean;
};

export default function YouTubeIconGroup({ isNavigation = false }: Props) {
  const { changeNavbar } = useNavbar();

  return (
    <div
      className={`relative flex items-center h-[100%] w-[32.25%] min-w-[165px] ${isNavigation ? "!w-full ml-1 mt-0.5 pb-4" : ""}`}
    >
      <LuMenu
        onClick={changeNavbar}
        className="flex justify-start size-10 mr-4 font-bold cursor-pointer hover:bg-gray-9 rounded-full px-0 sm:px-2 py-2"
      />{" "}
      <YouTubeIcon />{" "}
      <div className="h-[44px] text-[0.6em] pl-1 pt-1.5 text-gray-4">UA</div>
    </div>
  );
}
