"use client";

import SearchInput from "./SearchInput/SearchInput";

export default function Search() {
  return (
    <div className="hidden md:flex w-[38%] justify-center sm:min-w-[350px]">
      <div className="relative w-full">
        <SearchInput />
      </div>
    </div>
  );
}
