"use client";

import { useState } from "react";

type FlipElement = {
  element: HTMLElement;
  target: () => HTMLElement | null;
  scale?: boolean;
};

type RunFlipOptions = {
  elements: FlipElement[];
  changeLayout: () => void;
};

export function useFlipAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);

  const runFlip = ({ elements, changeLayout }: RunFlipOptions) => {
    const firstRects = elements.map(({ element }) => ({
      element,
      rect: element.getBoundingClientRect(),
    }));

    setIsAnimating(true);

    changeLayout();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const animations: Animation[] = [];

        for (const { element, rect: first } of firstRects) {
          const config = elements.find((item) => item.element === element);

          if (!config) continue;

          const target = config.target();

          if (!target) continue;

          const last = target.getBoundingClientRect();

          const dx = first.left - last.left;
          const dy = first.top - last.top;

          const sx = config.scale ? first.width / last.width : 1;

          const sy = config.scale ? first.height / last.height : 1;

          const animation = target.animate(
            [
              {
                transformOrigin: "top left",
                transform: `
                  translate(${dx}px, ${dy}px)
                  scale(${sx}, ${sy})
                `,
              },
              {
                transformOrigin: "top left",
                transform: "translate(0, 0) scale(1, 1)",
              },
            ],
            {
              duration: 1000,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );

          animations.push(animation);
        }

        Promise.all(animations.map((animation) => animation.finished)).then(
          () => {
            setIsAnimating(false);
          },
        );
      });
    });
  };

  return {
    isAnimating,
    runFlip,
  };
}
