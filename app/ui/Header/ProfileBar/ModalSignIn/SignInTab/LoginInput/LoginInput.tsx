"use client";

import { useState } from "react";
import MobileIcon from "../MobileIcon/MobileIcon";
import MailIcon from "../MailIcon/MailIcon";
import Select from "../SelectField/SelectField";

export default function LoginInput() {
  const [isFocus, setIsFocus] = useState(false);
  const [loginOption, setLoginOption] = useState<"email" | "phone">("email");

  const contriesOptions = [
    { name: "Ukraine", number: "+380", flagShift: 0 },
    { name: "Russia", number: "+7", flagShift: 20 },
    { name: "USA", number: "+1", flagShift: 40 },
  ];

  return (
    <div>
      {loginOption === "email" && (
        <div className="relative flex items-end h-[50px]">
          <input
            type="text"
            placeholder={!isFocus ? "Электронная почта" : ""}
            className="w-full h-[32px] focus:outline-none border-b-2 border-gray text-[1.15em]"
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => setIsFocus(e.target.value !== "")}
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
            Электронная почта
          </span>
        </div>
      )}

      {loginOption === "phone" && (
        <div className="relative flex items-end h-[50px]">
          <div className="flex items-center h-[32px] border-b-[2px] border-gray">
            <Select options={contriesOptions} />
          </div>
          <div className="w-px h-[14px] mb-[10px] bg-gray-4"></div>
          <input
            type="text"
            placeholder={!isFocus ? "Телефон" : ""}
            className="w-full h-[32px] focus:outline-none border-b-2 pl-3 border-gray text-[1.15em]"
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => setIsFocus(e.target.value !== "")}
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
            Телефон
          </span>
        </div>
      )}

      {loginOption === "email" && (
        <div
          className="inline-flex items-center mt-2 px-2.5 py-1.5 bg-gray text-xs text-brand-2 cursor-pointer hover:bg-gray-5"
          onClick={() => {
            setLoginOption("phone");
            console.log(loginOption);
          }}
        >
          <MobileIcon className="size-4 fill-brand-2 mr-1" /> Использовать
          телефон
        </div>
      )}

      {loginOption === "phone" && (
        <div
          className="inline-flex items-center mt-2 px-2.5 py-1.5 bg-gray text-xs text-brand-2 cursor-pointer hover:bg-gray-5"
          onClick={() => {
            setLoginOption("email");
            console.log(loginOption);
          }}
        >
          <MailIcon className="size-4 fill-brand-2 mr-1" /> Или используйте
          электронную почту
        </div>
      )}
    </div>
  );
}
