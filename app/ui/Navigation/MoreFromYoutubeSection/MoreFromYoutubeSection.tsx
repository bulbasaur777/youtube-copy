import NavItem from "../NavItem/NavItem";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";
import YouTubePremiumIcon from "../Icons/YouTubePremiumIcon";
import YouTubeMusicIcon from "../Icons/YouTubeMusicIcon";
import YouTubeKidsIcon from "../Icons/YouTubeKidsIcon";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function MoreFromYoutubeSection({ lang, isNavbarOpen }: Props) {
  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 border-b-1 border-gray-5 py-3">
      <div className="ml-3 font-medium my-1 text-[1.05rem]">
        {t.Navigation["More from YouTube"]}
      </div>

      <NavItem
        title={t.Navigation["YouTube Premium"]}
        path={<YouTubePremiumIcon />}
      />
      <NavItem
        title={t.Navigation["YouTube Music"]}
        path={<YouTubeMusicIcon />}
      />
      <NavItem
        title={t.Navigation["YouTube Kids"]}
        path={<YouTubeKidsIcon />}
      />
    </div>
  ) : null;
}
