"use client";

import * as Switch from "@radix-ui/react-switch";
import { useVideo } from "@/contexts/VideoContext";
import TooltipUI from "../TooltipUI/TooltipUI";

type Props = {
  isEndlessMode: boolean;
  onToggle: (isEndlessMode: boolean) => void;
};

export default function SwitchReplay({ isEndlessMode, onToggle }: Props) {
  const { playerContainerRef, isFullScreenMode } = useVideo();

  return (
    <TooltipUI
      content={
        isEndlessMode
          ? "Автовоспроизведение включено"
          : "Автовоспроизведение отключено"
      }
      portalContainer={
        isFullScreenMode ? playerContainerRef.current : undefined
      }
    >
      <Switch.Root
        checked={isEndlessMode === true}
        onCheckedChange={onToggle}
        aria-label="Бесконечное воспроизведение"
        className="relative h-[18px] w-[32px] rounded-full bg-white/30 outline-none data-[state=checked]:bg-white/80 transition-all duration-300 cursor-pointer ml-auto"
      >
        <Switch.Thumb className="block size-[14px] translate-x-0.5 rounded-full bg-white will-change-transform data-[state=checked]:translate-x-[16px] data-[state=checked]:bg-black transition-all duration-300" />
      </Switch.Root>
    </TooltipUI>
  );
}
