import { useState, useEffect } from "react";

const MOBILE_WIDTH = 768;

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize(width);

      if (width < MOBILE_WIDTH) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowSize, deviceType };
};
