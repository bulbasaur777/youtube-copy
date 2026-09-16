import * as React from "react";
import { Tooltip } from "radix-ui";
import { ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
};

export default function TooltipUI({ content, children }: TooltipProps) {
  return (
    <Tooltip.Provider disableHoverableContent delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded bg-gray-4/85 px-2 py-2.5 mt-2.5 text-xs leading-none text-bg z-10
                       will-change-[transform,opacity]
                       data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
                       data-[state=closed]:data-[side=bottom]:animate-slideDownAndFade"
            side="bottom"
            sideOffset={5}
          >
            {content}
            {/* <Tooltip.Arrow className="fill-gray-4" /> */}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
