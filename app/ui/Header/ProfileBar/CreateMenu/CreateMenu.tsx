"use client";

import * as React from "react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/contexts/LanguageContext";
import UploadIcon from "./icons/UploadIcon";
import GoLiveIcon from "./icons/GoLiveIcon";
import CreatePostIcon from "./icons/CreatePostIcon";
import { FiPlus } from "react-icons/fi";

export default function CreateMenu() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="flex justify-center items-center pl-3 pr-4 py-1 bg-gray-10 hover:bg-gray-3 rounded-full cursor-pointer mr-1 text-[14.5px] font-medium">
          <FiPlus className="size-6.5 mr-1" /> {t.Header["Create"]}
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
              sideOffset={5}
              className="z-10"
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
                    <li className="flex items-center gap-2 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <UploadIcon className="size-6" />{" "}
                      {t.Header["Upload Video"]}
                    </li>
                    <li className="flex items-center gap-2 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <GoLiveIcon className="size-6" />
                      {t.Header["Go live"]}
                    </li>
                    <li className="flex items-center gap-2 py-2 px-4 hover:bg-gray-3 cursor-pointer">
                      <CreatePostIcon className="size-6" />{" "}
                      {t.Header["Create Post"]}
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
