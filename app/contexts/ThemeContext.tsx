"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { Theme } from "@/types/theme";

type ThemeContextType = {
  theme: Theme;
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const router = useRouter();
  const [theme, setTheme] = useState(initialTheme);

  const changeTheme = () => {
    let newTheme: Theme;

    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }

    if (newTheme === theme) return;

    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useLang must be used within a LanguageProvider");
  return context;
};
