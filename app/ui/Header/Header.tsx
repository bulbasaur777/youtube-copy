import ProfileBar from "./ProfileBar/ProfileBar";
import Search from "./Search/Search";
import YouTubeIconGroup from "./YouTubeIconGroup/YouTubeIconGroup";

import { cookies } from "next/headers";
import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";

export default async function Header() {
  const lang = (await cookies()).get("lang")?.value || "ru";

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return (
    <header className="fixed flex justify-between w-full h-[56px] bg-bg/99 text-text px-3 pl-1 sm:px-4 items-center z-10 backdrop-blur-xl">
      <YouTubeIconGroup />
      <Search />
      <ProfileBar />
    </header>
  );
}
