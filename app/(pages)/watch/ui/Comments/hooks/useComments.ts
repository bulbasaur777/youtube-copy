"use client";

import { useEffect, useRef, useState } from "react";
import type { CommentSort } from "../types";

export default function useComments() {
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [commentSort, setCommentSort] = useState<CommentSort>("top");
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSortMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    isCommentFocused,
    setIsCommentFocused,
    isSortMenuOpen,
    setIsSortMenuOpen,
    commentSort,
    setCommentSort,
    sortMenuRef,
  };
}
