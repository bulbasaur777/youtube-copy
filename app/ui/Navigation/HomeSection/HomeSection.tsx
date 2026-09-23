import { HomeIcon, HomeIconActive } from "../Icons/HomeIcon";
import { ShortsIcon, ShortsIconActive } from "../Icons/ShortsIcon";
import NavItem from "../NavItem/NavItem";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";
import CompactNavItem from "../CompactNavItem/CompactNavItem";
import { useWindowSize } from "@/hooks/useWindowSize";

const translations = { ru, ua, en } as const;

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function HomeSection({ lang, isNavbarOpen }: Props) {
  const { windowSize } = useWindowSize();

  const t = translations[lang];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 mt-2 border-b-1 border-gray-5 pb-3">
      <NavItem
        title={t.Navigation.Home}
        path={<HomeIcon />}
        activePath={<HomeIconActive />}
        isActive={true}
      />
      <NavItem
        title={t.Navigation["Shorts"]}
        path={<ShortsIcon />}
        activePath={<ShortsIconActive />}
        isActive={false}
      />
    </div>
  ) : (
    <div>
      <CompactNavItem
        title={t.Navigation.Home}
        path={<HomeIcon />}
        activePath={<HomeIconActive />}
        isActive={true}
      />
      <CompactNavItem
        title={t.Navigation["Shorts"]}
        path={<ShortsIcon />}
        activePath={<ShortsIconActive />}
        isActive={false}
      />
    </div>
  );
}
