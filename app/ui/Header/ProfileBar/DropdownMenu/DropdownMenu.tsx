"use client";

import * as React from "react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

type Props = {
  children: React.ReactNode;
};

export default function DropdownMenuUI({ children }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content asChild sideOffset={4} className="z-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col w-[160px] overflow-hidden rounded bg-gray pt-1 pb-4"
              >
                <DropdownMenu.Label className="flex items-center text-text py-3 pl-4.5 pr-2 cursor-pointer">
                  <FaApple className="size-5 mr-2 text-gray-4" />{" "}
                  <span className="hover:text-brand-2">App Store</span>
                </DropdownMenu.Label>

                <DropdownMenu.Label className="flex items-center text-text py-3 pl-5 pr-2 cursor-pointer">
                  <FaGooglePlay className="size-4 mr-2 text-gray-4" />{" "}
                  <span className="hover:text-brand-2">Google Play</span>
                </DropdownMenu.Label>

                <DropdownMenu.Label className="flex items-center text-text py-3 pl-4.5 pr-2 cursor-pointer">
                  <IoLogoAndroid className="size-5 mr-2 text-gray-4" />{" "}
                  <span className="hover:text-brand-2">Android App</span>
                </DropdownMenu.Label>

                <Image
                  src="https://astatic.trovocdn.net/cat/img/0ec38d2.png?max_age=31536000&imageView2/2/format/webp"
                  alt=""
                  width="116"
                  height="116"
                  className="block border-4 border-white mx-auto mt-2"
                />

                <div className="flex justify-center text-center mt-4 px-2 text-gray-4 text-xs">
                  {t.Header["Scan to download"]}
                </div>
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
