"use client";

import * as React from "react";
import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "radix-ui";
import { IoSearch } from "react-icons/io5";

import { motion, AnimatePresence } from "motion/react";
import Search from "./Search/Search";

export default function MobileSearch() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IoSearch className="cursor-pointer size-6 md:hidden" />
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>

            {/* Content */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed w-full left-1/2 top-0 -translate-x-1/2 bg-transparent focus:outline-none z-50 shadow-lg"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <VisuallyHidden.Root>
                  <Dialog.Title className="text-lg font-medium text-gray-800">
                    Dialog Title
                  </Dialog.Title>
                </VisuallyHidden.Root>

                <div className="flex-inline items-center justify-center text-text px-4 mt-[14px]">
                  <Search />
                </div>

                {/* <Dialog.Close asChild>
                  <button
                    aria-label="Закрыть"
                    className="absolute right-1 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-4 hover:text-text cursor-pointer"
                  >
                    <Cross2Icon className="w-6 h-6" />
                  </button>
                </Dialog.Close> */}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
