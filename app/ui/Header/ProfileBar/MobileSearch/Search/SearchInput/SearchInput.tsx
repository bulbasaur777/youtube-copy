import { useLang } from "@/contexts/LanguageContext";
import React from "react";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput(props: SearchInputProps) {
  const { t } = useLang();
  return (
    <div className="flex items-center relative w-full h-[34px] bg-gray rounded">
      <input
        name="search"
        type="text"
        autoComplete="off"
        className="bg-gray focus:outline-0 px-3 text-gray-2 h-[34px] w-full placeholder:text-gray-2"
        placeholder={t.Header["Streams, Chanels, Games"]}
        {...props}
      />
      <button className="mr-3 h-full">
        <svg
          aria-hidden="true"
          className="fill-current w-[24px] h-[24px] text-gray-4"
        >
          <path
            d="M10.78 2c4.85 0 8.781 4.03 8.781 9 0 2.115-.712 4.06-1.903 5.595l4.066 3.905-1.38 1.414-4.062-3.9A8.612 8.612 0 0110.78 20C5.931 20 2 15.97 2 11s3.931-9 8.78-9zm0 2a7 7 0 100 14 7 7 0 000-14z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
