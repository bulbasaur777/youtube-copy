"use client";

import { useState } from "react";

export default function NameInput() {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div>
      <div className="relative flex items-end h-[50px]">
        <input
          type="text"
          placeholder={!isFocus ? "Имя пользователя" : ""}
          className="w-full h-[32px] focus:outline-none border-b-2 border-gray text-[1.15em]"
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => setIsFocus(e.target.value !== "")}
          autoComplete="new-name"
        />
        <div className="absolute flex w-full h-[2px] justify-center">
          <div
            className={`bg-brand-2 h-[2px] transition-all duration-300 ease-out z-10 ${
              isFocus
                ? "opacity-100 w-full pointer-events-auto"
                : "opacity-0 w-0 pointer-events-none"
            }`}
          ></div>
        </div>
        <span
          className={`absolute left-0 bottom-0 mb-1.5 pointer-events-none transition-transform duration-400 origin-left ease-in-out ${
            isFocus
              ? "opacity-100 scale-85 translate-y-[-25px] transform-gpu"
              : "opacity-0 scale-100 translate-y-[0px]"
          }`}
        >
          Имя пользователя
        </span>
      </div>
    </div>
  );
}
