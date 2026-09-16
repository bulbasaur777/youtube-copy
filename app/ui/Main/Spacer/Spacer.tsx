"use client";

import { useNavbar } from "@/contexts/NavbarContext";

export default function Spacer() {
  const { isNavbarOpen } = useNavbar();

  return (
    <div
      className={`shrink-0 hidden sm:block bg-bg
            ${isNavbarOpen ? "lg:w-[240px] sm:w-[72px]" : "w-[72px]"}
        `}
    ></div>
  );
}
