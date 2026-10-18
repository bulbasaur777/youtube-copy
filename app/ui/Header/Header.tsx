"use client";

import { usePathname } from "next/navigation";

import ProfileBar from "./ProfileBar/ProfileBar";
import Search from "./Search/Search";
import YouTubeIconGroup from "./YouTubeIconGroup/YouTubeIconGroup";
import { useVideo } from "@/contexts/VideoContext";

export default function Header({}) {
  const pathname = usePathname();
  const { isFullWidthVideo } = useVideo();
  const isWatchPage = pathname.startsWith("/watch");

  return (
    <header
      className={`${isWatchPage && isFullWidthVideo ? "dark" : ""} fixed flex justify-between w-full h-[56px] bg-bg/99 text-text px-3 pl-1 sm:px-4 items-center z-10 backdrop-blur-xl`}
    >
      <YouTubeIconGroup />
      <Search />
      <ProfileBar />
    </header>
  );
}
