"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import CogIcon from "../../../icons/CogIcon";
import TooltipUI from "../TooltipUI/TooltipUI";
import { useVideo } from "@/contexts/VideoContext";
import type { VideoQuality } from "@/hooks/useVideoController";

type MenuWindow = "main" | "quality";

type Props = {
  quality: VideoQuality;
  availableQualities: VideoQuality[];
  onQualityChange: (quality: VideoQuality) => void;
};

export default function VideoSettings({
  quality,
  availableQualities,
  onQualityChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [window, setWindow] = useState<MenuWindow>("main");

  const { playerContainerRef, isFullScreenMode } = useVideo();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setWindow("main");
    }
  };

  const handleQualityChange = (nextQuality: VideoQuality) => {
    onQualityChange(nextQuality);
    setOpen(false);
    setWindow("main");
  };

  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={handleOpenChange}
      modal={false}
    >
      <TooltipUI
        content="Настройки"
        portalContainer={
          isFullScreenMode ? playerContainerRef.current : undefined
        }
      >
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="Настройки видео"
            className="cursor-pointer outline-none"
          >
            <div
              className={`cursor-pointer transition-transform duration-200 ${
                open ? "rotate-[30deg]" : "rotate-0"
              }`}
            >
              <CogIcon />
            </div>
          </button>
        </DropdownMenu.Trigger>
      </TooltipUI>

      <DropdownMenu.Portal
        container={
          isFullScreenMode
            ? (playerContainerRef.current ?? undefined)
            : undefined
        }
        forceMount
      >
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content
              asChild
              side="top"
              align="end"
              sideOffset={24}
              alignOffset={-10}
              className="z-25"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="w-[220px] overflow-hidden rounded-lg bg-black/60 py-1 text-white shadow-lg"
              >
                {window === "main" && (
                  <div>
                    <DropdownMenu.Item
                      onSelect={(event) => {
                        event.preventDefault();
                        setWindow("quality");
                      }}
                      className="flex h-11 cursor-pointer select-none items-center px-4 text-sm outline-none hover:bg-white/10"
                    >
                      <span>Качество</span>

                      <div className="ml-auto flex items-center gap-1 text-white/70">
                        <span>{quality}</span>

                        <ChevronRightIcon className="size-5 cursor-pointer" />
                      </div>
                    </DropdownMenu.Item>
                  </div>
                )}

                {window === "quality" && (
                  <div>
                    <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3 text-white">
                      <button
                        type="button"
                        onClick={() => setWindow("main")}
                        className="cursor-pointer p-1 outline-none"
                        aria-label="Назад"
                      >
                        <ChevronLeftIcon className="size-5 cursor-pointer" />
                      </button>

                      <span className="text-sm font-medium">Качество</span>
                    </div>

                    <DropdownMenu.RadioGroup
                      value={quality}
                      onValueChange={(value) => {
                        if (
                          value === "144p" ||
                          value === "720p"
                        ) {
                          handleQualityChange(value);
                        }
                      }}
                    >
                      <DropdownMenu.RadioItem
                        value="144p"
                        disabled={!availableQualities.includes("144p")}
                        className="relative flex h-11 cursor-pointer select-none items-center px-4 pl-11 text-sm text-white outline-none hover:bg-white/10 data-[highlighted]:bg-white/10 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
                      >
                        <DropdownMenu.ItemIndicator className="absolute left-3">
                          <CheckIcon className="size-5" />
                        </DropdownMenu.ItemIndicator>
                        144p
                      </DropdownMenu.RadioItem>

                      <DropdownMenu.RadioItem
                        value="720p"
                        disabled={!availableQualities.includes("720p")}
                        className="relative flex h-11 cursor-pointer select-none items-center px-4 pl-11 text-sm text-white outline-none hover:bg-white/10 data-[highlighted]:bg-white/10 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
                      >
                        <DropdownMenu.ItemIndicator className="absolute left-3">
                          <CheckIcon className="size-5" />
                        </DropdownMenu.ItemIndicator>
                        720p
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                  </div>
                )}
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
