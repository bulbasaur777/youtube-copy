import * as React from "react";
import { HoverCard } from "radix-ui";

type Prop = {
  trigger: React.ReactElement;
  children: React.ReactElement;
};

export default function SubscriptionsCompactMenu({ trigger, children }: Prop) {
  return (
    <HoverCard.Root closeDelay={300} openDelay={500}>
      <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-[360px] rounded bg-bg text-text py-2 z-2 will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={6}
          side={"left"}
          align={"start"}
        >
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
