"use client";

import React from "react";
import MobileIcon from "./MobileIcon/MobileIcon";
import { useLang } from "@/contexts/LanguageContext";

const AppButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { t } = useLang();

  return (
    <div
      ref={ref}
      {...props}
      className="flex items-center px-3 py-0.5 border border-gray-2 bg-gray-3 font-bold text-[0.9em] cursor-pointer"
    >
      <MobileIcon className="w-4.5 h-4.5 fill-text mr-1" />
      <div className="pt-0.5">{t.Header["APP"]}</div>
    </div>
  );
});

AppButton.displayName = "AppButton";

export default AppButton;
