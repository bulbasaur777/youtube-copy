"use client";

import * as React from "react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/contexts/LanguageContext";
import DownloadIcon from "./icons/DownloadIcon";
import MenuIcon from "../icons/MenuIcon";
import AddToQueueIcon from "./icons/AddToQueueIcon";
import SaveToWatchLaterIcon from "./icons/SaveToWatchLaterIcon";
import SaveToPlayListIcon from "./icons/SaveToPlayListIcon";
import ShareIcon from "./icons/ShareIcon";
import NotInterestedIcon from "./icons/NotInterestedIcon";
import DontRecommendIcon from "./icons/DontRecommendIcon";
import ReportIcon from "./icons/ReportIcon";

export default function VideoContexMenu() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="absolute -top-2 -right-2 p-2 z-20 hover:bg-black/10 rounded-full">
          <MenuIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content
              asChild
              side="bottom"
              align="start"
              collisionPadding={5}
              sideOffset={10}
              alignOffset={0}
              className="z-1"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col overflow-hidden rounded-lg bg-bg shadow-sm"
              >
                <div>
                  <ul className="py-2 text-[14px] text-text">
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <AddToQueueIcon className="size-6" />{" "}
                      {t.Main["Add to queue"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <SaveToWatchLaterIcon className="size-6" />{" "}
                      {t.Main["Save to Watch later"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <SaveToPlayListIcon className="size-6" />{" "}
                      {t.Main["Save to playlist"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <DownloadIcon className="size-6" /> {t.Main["Download"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <ShareIcon className="size-6" /> {t.Main["Share"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <NotInterestedIcon className="size-6" />{" "}
                      {t.Main["Not interested"]}
                    </li>
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <DontRecommendIcon className="size-6" />{" "}
                      {t.Main["Don`t recommend channel"]}
                    </li>{" "}
                    <li className="flex items-center gap-3 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <ReportIcon className="size-6" /> {t.Main["Report"]}
                    </li>
                  </ul>
                </div>
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
