"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";

export type Lang = "ru" | "ua" | "en";

type Translations = typeof ru;

type RecursiveProxy<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? RecursiveProxy<T[K]>
    : string;
} & {
  [key: string]: string | RecursiveProxy<T>;
};

type LanguageContextType = {
  lang: Lang;
  changeLang: (lang: Lang) => void;
  t: RecursiveProxy<Translations>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function createTranslationProxy<T extends Record<string, unknown>>(
  obj: T,
): RecursiveProxy<T> {
  return new Proxy(obj as RecursiveProxy<T>, {
    get(target, prop) {
      const value = target[prop as keyof typeof target];

      if (typeof value === "object" && value !== null) {
        return createTranslationProxy(value as Record<string, unknown>);
      }

      if (typeof value === "string") {
        return value;
      }

      // если ключ не найден — возвращаем имя ключа
      return String(prop);
    },
  });
}

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  const router = useRouter();
  const [lang, setLang] = useState(initialLang);

  const changeLang = (newLang: Lang) => {
    if (newLang === lang) return;

    setLang(newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  const translation = useMemo(() => {
    switch (lang) {
      case "ua":
        return ua;

      case "en":
        return en;

      default:
        return ru;
    }
  }, [lang]);

  const t = createTranslationProxy(translation);

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLang must be used within a LanguageProvider");
  return context;
};
