"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang, Lang } from "@/contexts/LanguageContext";

type Props = {
  tooltip: React.ReactNode;
  children: React.ReactNode;
};

export default function DropdownMenuWithTooltip({ children }: Props) {
  const { lang, changeLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          {/* Один общий триггер */}
          <Tooltip.Trigger asChild>
            <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
          </Tooltip.Trigger>

          {/* Сам тултип */}
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={6}
              className="select-none rounded bg-text text-bg px-2.5 py-1.5 text-xs leading-none text-textHighlight"
            >
              {t.Header["Language"]}
              <Tooltip.Arrow className="fill-text" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Меню */}
      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {isOpen && (
            <DropdownMenu.Content asChild className="z-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="min-w-[280px] overflow-hidden rounded-md bg-gray pb-2"
              >
                <DropdownMenu.Label className="flex justify-center text-sm font-bold text-text py-1.5 border-b border-gray-5">
                  {t.Header["Display Language"]}
                </DropdownMenu.Label>
                <DropdownMenu.Label className="px-4 text-gray-2 text-[0.8em] py-2">
                  {t.Header["Choose Trovo Language"]}
                </DropdownMenu.Label>
                {[
                  { code: "ru", label: "Русский" },
                  { code: "ua", label: "Українська" },
                  { code: "en", label: "English" },
                ].map(({ code, label }) => (
                  <DropdownMenu.CheckboxItem
                    key={code}
                    checked={lang === code}
                    onCheckedChange={() => changeLang(code as Lang)}
                    className="flex h-[25px] select-none items-center px-4 py-4 text-[0.9em] leading-none text-text hover:bg-gray-5 cursor-pointer outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-bgHighlight data-[disabled]:text-gray-400 data-[highlighted]:text-textHighlight"
                  >
                    <DropdownMenu.ItemIndicator className="absolute right-2 inline-flex w-[25px] items-center justify-center">
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {label}
                  </DropdownMenu.CheckboxItem>
                ))}
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
