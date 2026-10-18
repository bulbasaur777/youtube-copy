"use client";

import { useEffect, useRef, useState } from "react";
export default function useVideoDetails() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaveMenuOpen, setIsSaveMenuOpen] = useState(false);
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [customPlaylists, setCustomPlaylists] = useState<string[]>([]);
  const [savedPlaylists, setSavedPlaylists] = useState<string[]>([]);
  const saveMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!saveMenuRef.current?.contains(event.target as Node)) {
        setIsSaveMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSaveMenuOpen(false);
        setIsCreatePlaylistOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleSavedPlaylist = (name: string) => {
    setSavedPlaylists((saved) =>
      saved.includes(name)
        ? saved.filter((playlist) => playlist !== name)
        : [...saved, name],
    );
  };

  const createPlaylist = () => {
    const name = playlistName.trim();
    if (!name) return;
    setCustomPlaylists((playlists) =>
      playlists.includes(name) ? playlists : [...playlists, name],
    );
    setSavedPlaylists((saved) =>
      saved.includes(name) ? saved : [...saved, name],
    );
    setPlaylistName("");
    setIsCreatePlaylistOpen(false);
    setIsSaveMenuOpen(false);
  };

  return {
    isDescriptionExpanded,
    setIsDescriptionExpanded,
    isSubscribed,
    setIsSubscribed,
    isLiked,
    setIsLiked,
    isDisliked,
    setIsDisliked,
    isSaveMenuOpen,
    setIsSaveMenuOpen,
    isCreatePlaylistOpen,
    setIsCreatePlaylistOpen,
    playlistName,
    setPlaylistName,
    customPlaylists,
    savedPlaylists,
    saveMenuRef,
    toggleSavedPlaylist,
    createPlaylist,
  };
}

export type VideoDetailsState = ReturnType<typeof useVideoDetails>;

export type VideoActionsState = Pick<
  VideoDetailsState,
  | "isSubscribed"
  | "setIsSubscribed"
  | "isLiked"
  | "setIsLiked"
  | "isDisliked"
  | "setIsDisliked"
  | "saveMenuRef"
  | "isSaveMenuOpen"
  | "setIsSaveMenuOpen"
  | "isCreatePlaylistOpen"
  | "setIsCreatePlaylistOpen"
  | "playlistName"
  | "setPlaylistName"
  | "customPlaylists"
  | "savedPlaylists"
  | "toggleSavedPlaylist"
  | "createPlaylist"
>;

export type DescriptionState = Pick<
  VideoDetailsState,
  "isDescriptionExpanded" | "setIsDescriptionExpanded"
>;
