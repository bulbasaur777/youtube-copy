"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang, Lang } from "@/contexts/LanguageContext";
import BellIcon from "./BellIcon/BellIcon";
import SettingsIcon from "../UserSettingsContent/icons/SettingsIcon";

export default function Notifications() {
  const { lang, changeLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Tooltip.Provider disableHoverableContent delayDuration={100}>
        <Tooltip.Root>
          {/* Один общий триггер */}
          <Tooltip.Trigger asChild>
            <DropdownMenu.Trigger asChild>
              <div className="hidden sm:flex items-center justify-center size-10 hover:bg-gray-9 rounded-full cursor-pointer">
                <BellIcon className="size-6" />
              </div>
            </DropdownMenu.Trigger>
          </Tooltip.Trigger>

          {/* Сам тултип */}
          <Tooltip.Portal>
            <Tooltip.Content
              className="select-none rounded bg-gray-4/85 text-bg px-2 py-2.5 mt-2.5 text-xs leading-none text-textHighlight z-10
                         will-change-[transform,opacity]
                         data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
                         data-[state=closed]:data-[side=bottom]:animate-slideDownAndFade"
              sideOffset={5}
              side="bottom"
            >
              {t.Header["Notifications"]}
              {/* <Tooltip.Arrow className="fill-text" /> */}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Меню */}
      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {isOpen && (
            <DropdownMenu.Content
              sideOffset={6}
              align="end"
              asChild
              className="flex flex-col z-10 w-[85vw] md:w-[480px] h-[400px] md:h-[575px]"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-md bg-bg shadow-sm"
              >
                <DropdownMenu.Label className="flex justify-between text-text py-3 px-3 border-b border-gray-5">
                  {t.Header["Notifications"]}{" "}
                  <SettingsIcon className="size-6" />
                </DropdownMenu.Label>
                <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
                  <BellIcon className="size-30 text-gray-2" />
                  <div className="text-text">Your notifications live here</div>
                  <div className="flex text-center mt-[-10px] text-sm w-[50%] text-gray-4">
                    Subscribe to your favorite channels to get notified about
                    their latest videos.
                  </div>
                </div>
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
