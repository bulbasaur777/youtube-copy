import NavItem from "../NavItem/NavItem";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import { useState } from "react";
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import MusicIcon from "../Icons/MusicIcon";
import MoviesIcon from "../Icons/MoviesIcon";
import GamingIcon from "../Icons/GamingIcon";
import NewsIcon from "../Icons/NewsIcon";
import SportsIcon from "../Icons/SportsIcon";
import LearningIcon from "../Icons/LearningIcon";
import PlayablesIcon from "../Icons/PlayablesIcon";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function ExploreSection({ lang, isNavbarOpen }: Props) {
  const [showAll, setShowAll] = useState(false);

  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 border-b-1 border-gray-5 py-3">
      <div className="ml-3 font-medium my-1 text-[1.05rem]">
        {t.Navigation["Explore"]}
      </div>

      <NavItem title={t.Navigation["Music"]} path={<MusicIcon />} />
      <NavItem title={t.Navigation["Movies"]} path={<MoviesIcon />} />
      <NavItem title={t.Navigation["Gaming"]} path={<GamingIcon />} />

      {showAll ? (
        <>
          <NavItem title={t.Navigation["News"]} path={<NewsIcon />} />
          <NavItem title={t.Navigation["Sports"]} path={<SportsIcon />} />
          <NavItem title={t.Navigation["Learning"]} path={<LearningIcon />} />
          <NavItem title={t.Navigation["Playables"]} path={<PlayablesIcon />} />
        </>
      ) : null}

      <ShowMoreBtn
        title={showAll ? "Show less" : "Show more"}
        isNavbarOpen={isNavbarOpen}
        onClick={() => setShowAll((prev) => !prev)}
      />
    </div>
  ) : null;
}
