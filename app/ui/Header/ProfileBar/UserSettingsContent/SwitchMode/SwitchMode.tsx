"use client";

import * as React from "react";
import * as Switch from "@radix-ui/react-switch";

type Props = {
  mode: "dark" | "light";
};

export default function SwitchUI({ mode }: Props) {
  return (
    <Switch.Root
      checked={mode === "dark"}
      className="relative h-[25px] w-[42px] rounded-full bg-text/20 outline-none data-[state=checked]:bg-bgHighlight transition-all duration-300 cursor-pointer ml-auto"
    >
      <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-bg will-change-transform data-[state=checked]:translate-x-[19px] transition-all duration-300" />
    </Switch.Root>
  );
}
