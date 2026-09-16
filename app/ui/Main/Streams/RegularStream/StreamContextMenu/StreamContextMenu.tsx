import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";

export default function StreamContextMenu({ streamer }: { streamer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="absolute right-0 p-1 z-2 hover:bg-gray-2/40 rounded-full pointer-events-auto">
          <BsThreeDotsVertical className="size-4.5" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal forceMount>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content asChild sideOffset={4} side="top">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                onMouseLeave={() => setOpen(false)}
                className="absolute bottom-0 right-[-20px] z-2 flex flex-col w-[220px] overflow-hidden rounded bg-gray py-2 border-gray-5 border text-text"
              >
                <div
                  className="flex gap-3 px-4 py-1 hover:bg-gray-2/40 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <IoHeartDislikeOutline className="size-5.5" />
                  </div>
                  <div>Не интересно</div>
                </div>
                <div
                  className="flex gap-3 px-4 py-1 hover:bg-gray-2/40 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <MdBlockFlipped className="size-5.5" />
                  </div>
                  <div className="line-clamp-2">Заблокировать {streamer}</div>
                </div>
              </motion.div>
            </DropdownMenu.Content>
          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
