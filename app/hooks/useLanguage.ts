"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type Lang } from "@/types/language";

export function useLanguage(defaultLang: Lang = "ru") {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored as Lang);
  }, []);

  const changeLang = (newLang: string) => {
    // 1️⃣ Обновляем состояние и localStorage
    setLang(newLang as Lang);
    localStorage.setItem("lang", newLang);

    // 2️⃣ Устанавливаем cookie
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;

    // 3️⃣ Принудительно обновляем серверные компоненты
    router.refresh();
  };

  return { lang, changeLang };
}
