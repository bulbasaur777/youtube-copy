"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { VisuallyHidden } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

type Props = {
  modalWindow: React.ReactNode;
  tooltip: React.ReactNode;
  children: React.ReactNode;
};

export default function DialogWithTooltip({
  modalWindow,
  tooltip,
  children,
}: Props) {
  return (
    <Dialog.Root>
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          {/* Один общий триггер */}
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
          </Tooltip.Trigger>

          {/* Сам тултип */}
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={6}
              className="select-none rounded bg-text text-bg px-2.5 py-1.5 text-xs leading-none text-textHighlight"
            >
              {tooltip}
              <Tooltip.Arrow className="fill-text" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Модалка */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn z-3" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-bg-main shadow-lg focus:outline-none data-[state=open]:animate-scaleIn z-4">
          <VisuallyHidden.Root>
            {" "}
            <Dialog.Title className="text-lg font-medium text-gray-800">
              Dialog Title
            </Dialog.Title>
          </VisuallyHidden.Root>

          <div>{modalWindow}</div>

          <Dialog.Close asChild>
            <button
              aria-label="Закрыть"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-4 hover:text-text cursor-pointer"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
