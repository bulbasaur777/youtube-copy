"use client";

import SearchInput from "@/ui/Header/Search/SearchInput/SearchInput";

export default function Search() {
  return (
    <div className="flex w-full min-w-0 justify-center">
      <div className="relative w-full">
        <SearchInput
          searchContentClassName="min-w-[calc(100vw-2rem)]"
          showMicrophoneTooltip={false}
        />
      </div>
    </div>
  );
}
