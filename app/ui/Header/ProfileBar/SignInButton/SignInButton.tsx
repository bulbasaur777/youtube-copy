"use client";

import React from "react";
import { useLang } from "@/contexts/LanguageContext";

const SignInButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { t } = useLang();

  return (
    <div
      ref={ref}
      {...props}
      className="flex items-center px-3 py-1 bg-brand-2 text-white rounded-xs text-[0.9em] cursor-pointer"
    >
      <span className="hidden md:block">
        {t.Header["LogIn"]} / {t.Header["SignUp"]}
      </span>
      <span className="md:hidden">{t.Header["LogIn"]}</span>
    </div>
  );
});

SignInButton.displayName = "AppButton";

export default SignInButton;
