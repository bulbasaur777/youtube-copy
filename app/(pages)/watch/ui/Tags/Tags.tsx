"use client";

import { useEffect, useRef, useState } from "react";
import { useVideoLayout } from "@/contexts/VideoLayoutContext";
import { SliderBar } from "./Slidebar/Slidebar";
import Tag from "./Tag/Tag";

type FixedPosition = {
  top: number;
  left: number;
  width: number;
};

type Props = {
  tags: { name: string }[];
};

export default function Tags({ tags }: Props) {
  const { mainVideoRef } = useVideoLayout();
  const tagsRef = useRef<HTMLDivElement>(null);
  const [fixedPosition, setFixedPosition] = useState<FixedPosition | null>(
    null,
  );

  useEffect(() => {
    const updatePosition = () => {
      if (!window.matchMedia("(max-width: 639px)").matches) {
        setFixedPosition(null);
        return;
      }

      const tagsElement = tagsRef.current;
      const videoElement = mainVideoRef.current;
      if (!tagsElement || !videoElement) return;

      const tagsRect = tagsElement.getBoundingClientRect();
      const videoBottom = videoElement.getBoundingClientRect().bottom;
      if (tagsRect.top > videoBottom) {
        setFixedPosition(null);
        return;
      }

      const nextPosition = {
        top: videoBottom,
        left: tagsRect.left,
        width: tagsRect.width,
      };
      setFixedPosition((current) =>
        current &&
        current.top === nextPosition.top &&
        current.left === nextPosition.left &&
        current.width === nextPosition.width
          ? current
          : nextPosition,
      );
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    const resizeObserver = new ResizeObserver(updatePosition);
    if (mainVideoRef.current) {
      resizeObserver.observe(mainVideoRef.current);
    }
    if (tagsRef.current) {
      resizeObserver.observe(tagsRef.current);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      resizeObserver.disconnect();
    };
  }, [mainVideoRef]);

  return (
    <div
      ref={tagsRef}
      className={`${fixedPosition ? "h-12" : "h-[32px]"} w-full`}
    >
      <div
        className={`w-full bg-bg/99 backdrop-blur-xl ${
          fixedPosition
            ? "fixed z-[11] py-2"
            : "sm:sticky sm:top-[56px] sm:z-2"
        }`}
        style={
          fixedPosition
            ? {
                top: fixedPosition.top,
                left: fixedPosition.left,
                width: fixedPosition.width,
              }
            : undefined
        }
      >
        <div className="relative flex h-[32px] w-full select-none border-slate-300 border-solid">
          <div className="relative flex h-[32px] w-full overflow-x-hidden pb-0">
            <SliderBar controls={true}>
              {tags.map(({ name }) => (
                <Tag
                  key={name}
                  name={name}
                  isActive={name === "Animals"}
                />
              ))}
            </SliderBar>
          </div>
        </div>
      </div>
    </div>
  );
}

const tagNames = [
  "Все",
  "Музыка",
  "Подкасты",
  "Russia Fishing 4",
  "Trovo Play",
  "Path of Exile 2",
  "Fortnite",
  "Trovo`s Battlegrounds",
  "ChitChat",
  "Raid: Shadow Legends",
  "Elder Ring",
  "Chill",
  "I`m only sleeping",
  "World of Tanks1",
  "Marvel`s Spider-Man Remastered1",
  "Russia Fishing 41",
  "Trovo Play1",
  "Path of Exile 21",
  "Fortnite1",
];
