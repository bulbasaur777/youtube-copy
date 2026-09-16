import { useLang } from "@/contexts/LanguageContext";
import React, { useState } from "react";
import SearchContent from "../SearchContent/SearchContent";
import { PiMicrophone } from "react-icons/pi";
import { GrKeyboard } from "react-icons/gr";
import TooltipUI from "../../ProfileBar/Tooltip/Tooltip";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput(props: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  return (
    <div className="flex items-center relative w-full bg-bg/0 h-[40px] rounded">
      <div className="relative flex-1 h-full">
        <span
          className={`absolute top-2.5 left-4.5 ${!isOpen ? "hidden" : ""}`}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 fill-current text-gray-1"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.78 2c4.85 0 8.781 4.03 8.781 9 0 2.115-.712 4.06-1.903 5.595l4.066 3.905-1.38 1.414-4.062-3.9A8.612 8.612 0 0110.78 20C5.931 20 2 15.97 2 11s3.931-9 8.78-9zm0 2a7 7 0 100 14 7 7 0 000-14z"
              fillRule="evenodd"
            />
          </svg>
        </span>
        <input
          name="search"
          type="text"
          autoComplete="off"
          className={`focus:outline-0 px-4 pb-[2px] text-gray-4 bg-bg border-1 rounded-l-3xl h-[40px] placeholder:text-gray-4 ${!isOpen ? "ml-9 w-[calc(100%_-_2.25rem)] border-gray-5" : "w-full pl-12 border-blue-800 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"}`}
          placeholder={t.Header["Search"]}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />

        <GrKeyboard className="absolute top-2.5 right-3 size-4.5 text-gray-4" />
        <SearchContent isOpen={isOpen} />
      </div>

      <div className="flex w-[64px] h-full justify-center items-center border-1 border-l-0 border-gray-5 rounded-r-3xl bg-gray-10 hover:bg-gray-3 transition-all duration-300">
        <button className="flex items-center justify-center w-full h-full cursor-pointer">
          <svg
            aria-hidden="true"
            className="h-6 w-6 fill-current text-gray-1"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.78 2c4.85 0 8.781 4.03 8.781 9 0 2.115-.712 4.06-1.903 5.595l4.066 3.905-1.38 1.414-4.062-3.9A8.612 8.612 0 0110.78 20C5.931 20 2 15.97 2 11s3.931-9 8.78-9zm0 2a7 7 0 100 14 7 7 0 000-14z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-end items-center w-[50px] h-full">
        <TooltipUI content={`Голосовой поиск`}>
          <PiMicrophone className="text-[36px] px-1.5 bg-gray-10 hover:bg-gray-9 transition-all duration-150 rounded-2xl cursor-pointer " />
        </TooltipUI>
      </div>
    </div>
  );
}
