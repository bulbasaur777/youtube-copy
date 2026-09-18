"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HoverCard } from "radix-ui";
import { BsBadgeHd } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { GiCrystalBall } from "react-icons/gi";
import { truncateText } from "@/lib/services/truncateText";

type Props = {
  children: React.ReactNode;
};

export default function HoverCardUI({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={setOpen}
      openDelay={200}
      closeDelay={200}
    >
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>

      <HoverCard.Portal forceMount>
        <AnimatePresence>
          {open && (
            <HoverCard.Content asChild sideOffset={16} className="z-4">
              <motion.div
                initial={{ opacity: 0.25, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 right-[-85px] md:right-[-135px] w-[375px] overflow-hidden"
              >
                <div
                  className="flex justify-end text-white h-[120px] pt-3 pb-4 px-4
                           bg-brand-2 bg-[url('https://astatic.trovocdn.net/cat/img/77b38fa.png?max_age=31536000&imageView2/2/format/webp')] bg-cover bg-left"
                >
                  <div className="flex flex-col gap-2 w-[250px]">
                    <div className="text-end">
                      Войдите для полного доступа к плюшкам
                    </div>
                    <div className="flex justify-evenly">
                      <div className="flex flex-col items-center w-[80px] gap-1 text-xs">
                        <div>
                          <BsBadgeHd className="size-5" />
                        </div>
                        <div className="text-white/60 text-center">
                          {truncateText("1080p", 10)}
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-[80px] gap-1 text-xs">
                        <div>
                          <GoPeople className="size-5" />
                        </div>
                        <div className="text-white/60 text-center">
                          {truncateText("Сообщества", 10)}
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-[80px] gap-1 text-xs">
                        <div>
                          <GiCrystalBall className="size-5" />
                        </div>
                        <div className="text-white/60 text-center">
                          {truncateText("Бесплатная мана", 10)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-text w-full bg-gray-3 px-3 py-3">
                  <button
                    type="button"
                    className="w-full bg-brand-2 text-white py-1 cursor-pointer"
                  >
                    Войти
                  </button>
                </div>
              </motion.div>
            </HoverCard.Content>
          )}
        </AnimatePresence>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
