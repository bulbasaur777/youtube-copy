import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function DialogUI({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-bg/80 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-2/5 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-bg p-[25px] shadow-[var(--shadow-base)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-gray-800">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-accent">
            Make changes to your profile here. Click save when you`re done.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-text"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-text/70 shadow-[0_0_0_1px] shadow-text/50 outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-text"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-text/70 shadow-[0_0_0_1px] shadow-text/50 outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              defaultValue="@peduarte"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded bg-bg border border-text cursor-pointer px-[15px] font-medium text-text hover:bg-bgHighlight hover:text-textHighlight transition-all duration-300 outline-none select-none">
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-gray-800 cursor-pointer"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
