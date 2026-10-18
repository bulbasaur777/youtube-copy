import { useEffect, useRef, useState } from "react";

export function useAutoHideScrollbar(timeout = 1000) {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowScrollbar(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setShowScrollbar(false);
      }, timeout);
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeout]);

  return { scrollRef, showScrollbar };
}
