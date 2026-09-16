"use client";

import { useState } from "react";
import SearchContent from "./SearchContent/SearchContent";
import SearchInput from "./SearchInput/SearchInput";
import { SearchSeparator } from "./SearchSeparator/SearchSeparator";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center min-w-[350px]">
      <div className="relative w-full">
        <SearchInput
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />

        <SearchContent isOpen={isOpen} />
        <SearchSeparator isOpen={isOpen} />
      </div>
    </div>
  );
}
