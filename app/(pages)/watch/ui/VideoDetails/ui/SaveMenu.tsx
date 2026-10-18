"use client";

import {
  LuCheck,
  LuListPlus,
  LuX,
} from "react-icons/lu";
import type { VideoActionsState } from "../hooks/useVideoDetails";
import type { WatchLabels } from "../../labels";

type Props = {
  text: WatchLabels;
  state: VideoActionsState;
};

export default function SaveMenu({ text, state }: Props) {
  const {
    saveMenuRef,
    isSaveMenuOpen,
    setIsSaveMenuOpen,
    isCreatePlaylistOpen,
    setIsCreatePlaylistOpen,
    playlistName,
    setPlaylistName,
    customPlaylists,
    savedPlaylists,
    toggleSavedPlaylist,
    createPlaylist,
  } = state;

  return (
    <div className="relative shrink-0" ref={saveMenuRef}>
      <button
        type="button"
        aria-expanded={isSaveMenuOpen}
        onClick={() => {
          setIsSaveMenuOpen((open) => !open);
          setIsCreatePlaylistOpen(false);
        }}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-gray px-3 text-[14.5px] font-medium hover:bg-text/10"
      >
        <LuListPlus size={19} strokeWidth={1.8} />
        {text.save}
      </button>
      {isSaveMenuOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl bg-bg py-2 text-text shadow-[0_4px_24px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
          <div className="flex items-center justify-between px-4 pb-2 pt-1">
            <span className="text-sm font-medium">{text.save}</span>
            <button
              type="button"
              aria-label={text.more}
              onClick={() => setIsSaveMenuOpen(false)}
              className="flex size-8 items-center justify-center rounded-full hover:bg-gray"
            >
              <LuX size={18} />
            </button>
          </div>
          {["Watch later", ...customPlaylists].map((playlist) => {
            const isSaved = savedPlaylists.includes(playlist);
            const title =
              playlist === "Watch later" ? text.watchLater : playlist;
            return (
              <button
                type="button"
                key={playlist}
                aria-pressed={isSaved}
                onClick={() => toggleSavedPlaylist(playlist)}
                className="flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 text-left text-sm hover:bg-gray"
              >
                <span className="flex size-5 items-center justify-center">
                  {isSaved && <LuCheck size={17} />}
                </span>
                <span className="flex-1">{title}</span>
              </button>
            );
          })}
          <div className="my-2 border-t border-text/10" />
          {!isCreatePlaylistOpen ? (
            <button
              type="button"
              onClick={() => setIsCreatePlaylistOpen(true)}
              className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm hover:bg-gray"
            >
              <LuListPlus size={19} />
              {text.createPlaylist}
            </button>
          ) : (
            <form
              className="px-4 pb-2"
              onSubmit={(event) => {
                event.preventDefault();
                createPlaylist();
              }}
            >
              <label className="mb-2 block text-xs text-text/60">
                {text.playlistName}
              </label>
              <input
                autoFocus
                value={playlistName}
                onChange={(event) => setPlaylistName(event.target.value)}
                className="h-9 w-full border-b border-text/40 bg-transparent text-sm outline-none focus:border-text"
              />
              <button
                type="submit"
                disabled={!playlistName.trim()}
                className="mt-3 flex h-9 w-full items-center justify-center rounded-full bg-text px-4 text-sm font-medium text-bg hover:bg-text/80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {text.create}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
