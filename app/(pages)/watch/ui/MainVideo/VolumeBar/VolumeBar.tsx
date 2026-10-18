"use client";

import { Slider } from "radix-ui";

import { useVideo } from "@/contexts/VideoContext";

export default function VolumeBar() {
  const { volume, isMuted, handleVolumeChange } = useVideo();

  return (
    <Slider.Root
      className="relative flex h-5 w-[50px] touch-none select-none items-center cursor-pointer"
      value={[isMuted ? 0 : volume * 100]}
      onValueChange={([value]) => {
        handleVolumeChange(value / 100);
      }}
      max={100}
      min={0}
      step={1}
      aria-label="Volume"
    >
      <Slider.Track className="relative h-[2px] grow rounded-full bg-white/40">
        <Slider.Range className="absolute h-full rounded-full bg-white" />
      </Slider.Track>

      <Slider.Thumb
        className="block size-3 rounded-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Volume"
      />
    </Slider.Root>
  );
}
