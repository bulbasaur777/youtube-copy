"use client";

import type { WatchLabels } from "@/types/watchLabels";

type Props = {
  text: WatchLabels;
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
};

export default function CommentComposer({
  text,
  isFocused,
  onFocusChange,
}: Props) {
  return (
    <div className="mt-4 flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5c6bc0] text-[1.1em] text-white">
        N
      </div>
      <div className="min-w-0 flex-1">
        <input
          aria-label={text.addComment}
          placeholder={text.commentPlaceholder}
          onFocus={() => onFocusChange(true)}
          onBlur={(event) => {
            if (!event.currentTarget.value) onFocusChange(false);
          }}
          className="h-8 w-full border-b border-text/25 bg-transparent text-sm outline-none placeholder:text-text/60 focus:border-text"
        />
        {isFocused && (
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onFocusChange(false)}
              className="h-9 rounded-full px-4 text-sm font-medium hover:bg-gray"
            >
              {text.cancel}
            </button>
            <button
              type="button"
              className="h-9 cursor-pointer rounded-full bg-gray px-5 text-sm font-medium text-text/50"
            >
              {text.postComment}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
