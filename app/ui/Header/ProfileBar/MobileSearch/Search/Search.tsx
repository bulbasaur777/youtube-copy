"use client";

import SearchInput from "@/ui/Header/Search/SearchInput/SearchInput";

export default function Search({
  onSearchStart,
}: {
  onSearchStart: () => void;
}) {
  return (
    <div className="flex w-full min-w-0 justify-center">
      <div className="relative w-full">
        <SearchInput
          searchContentClassName="min-w-[calc(100vw-2rem)]"
          showMicrophoneTooltip={false}
          onSearchStart={onSearchStart}
        />
      </div>
    </div>
  );
}
