"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import Arrow from "./Arrow/Arrow";

export function SliderBar({
  children,
  controls = false,
}: {
  children: React.ReactNode;
  controls?: boolean;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [shift, setShift] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [startClientX, setStartClientX] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [direction, setDirection] = useState<"right" | "left">("left");
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerScrollWidth, setContainerScrollWidth] = useState<number>(0);
  const { width: windowSize } = useWindowSize();
  const [parent, setParent] = useState<HTMLElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerScrollWidth(containerRef.current!.scrollWidth);
      setParent(
        containerRef.current.parentElement?.parentElement as HTMLDivElement,
      );
    }
  }, [windowSize]);

  function handleMouseDown(e: React.MouseEvent | React.TouchEvent) {
    if (
      containerRef.current!.scrollWidth !== containerRef.current!.offsetWidth
    ) {
      setIsDragging(true);
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartPosition(clientX - shift);
    setStartTime(new Date().getTime());
    setStartClientX(clientX);
  }

  function handleMouseMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDragging) {
      return false;
    }
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const differencePos = clientX - startPosition;
    setShift(differencePos);

    if (differencePos > shift) {
      setDirection("left");
    } else if (differencePos < shift) {
      setDirection("right");
    }
  }

  function handleMouseUp(e: React.MouseEvent | React.TouchEvent) {
    const clientX = "touches" in e ? e.changedTouches[0].clientX : e.clientX;
    const currTime = new Date().getTime();

    let differencePos: number;
    differencePos = clientX - startClientX;
    const differenceTime = currTime - startTime;
    const extraShift = calcExtraShift(differencePos, differenceTime);

    if (direction === "left") {
      differencePos = clientX + extraShift! - startPosition;
    } else {
      differencePos = clientX - extraShift! - startPosition;
    }

    if (shift + extraShift! > 0 && direction === "left") {
      setShift(0);
    } else if (
      shift - containerWidth - extraShift! < -containerScrollWidth &&
      direction === "right"
    ) {
      setShift(containerWidth - containerScrollWidth);
    } else {
      setShift(differencePos);
    }

    setIsDragging(false);
  }

  function handleMouseLeave(e: React.MouseEvent | React.TouchEvent) {
    if (isDragging) {
      handleMouseUp(e);
    }
  }

  function shiftBar(direction: "left" | "right") {
    let extraShift;

    if (direction === "left") {
      extraShift = (containerWidth + 20) / 2;
    } else {
      extraShift = (-containerWidth - 20) / 2;
    }

    if (shift + extraShift! > 0 && direction === "left") {
      setShift(0);
    } else if (
      shift - containerWidth - containerWidth / 2 < -containerScrollWidth &&
      direction === "right"
    ) {
      setShift(containerWidth - containerScrollWidth);
    } else {
      setShift((prev) => prev + extraShift);
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          top: 0,
          transform: `translateX(${shift}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
        className="flex items-center h-[40px] gap-3 absolute w-full select-none transform-gpu"
      >
        {children}
      </div>

      {controls && (
        <>
          {shift < 0 && (
            <Arrow
              onClick={() => shiftBar("left")}
              direction="left"
              parent={parent}
            />
          )}

          {shift - containerWidth > -containerScrollWidth && (
            <Arrow
              onClick={() => shiftBar("right")}
              direction="right"
              parent={parent}
            />
          )}
        </>
      )}
    </>
  );
}

function calcExtraShift(position: number, time: number) {
  const speed = Math.abs(position) / time;

  if (Math.abs(position) < 40 || speed < 0.1) {
    return 0;
  }

  if (speed > 3.5) {
    return 1200;
  }

  if (speed > 2.5) {
    return 700;
  }

  if (speed > 2) {
    return 400;
  }

  if (speed > 1.5) {
    return 350;
  }

  if (speed > 0.5) {
    return 250;
  }

  if (speed <= 0.5) {
    return 100;
  }

  if (speed <= 0.3) {
    return 20;
  }
}
