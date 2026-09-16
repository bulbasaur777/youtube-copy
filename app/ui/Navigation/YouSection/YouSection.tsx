import NavItem from "../NavItem/NavItem";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import YouBtn from "./YouBtn/YouBtn";
import YourChannelIcon from "../Icons/YourChannelIcon";
import HistoryIcon from "../Icons/HistoryIcon";
import PlaylistIcon from "../Icons/PlaylistIcon";
import WatchLaterIcon from "../Icons/WatchLaterIcon";
import LikedVideosIcon from "../Icons/LikedVideosIcon";
import YourVideosIcon from "../Icons/YourVideosIcon";
import DownloadsIcon from "../Icons/DownloadsIcon";
import YouCompactBtn from "./YouCompactBtn/YouCompactBtn";
import YouCompactMenu from "./YouCompactMenu/YouCompactMenu";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function YouSection({ lang, isNavbarOpen }: Props) {
  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 border-b-1 border-gray-5 py-3">
      <YouBtn title={"You"} isNavbarOpen={isNavbarOpen} />

      <NavItem
        title={t.Navigation["Your Channel"]}
        path={<YourChannelIcon />}
      />
      <NavItem title={t.Navigation["History"]} path={<HistoryIcon />} />
      <NavItem title={t.Navigation["Playlist"]} path={<PlaylistIcon />} />

      <NavItem title={t.Navigation["Watch Later"]} path={<WatchLaterIcon />} />
      <NavItem
        title={t.Navigation["Liked Videos"]}
        path={<LikedVideosIcon />}
      />
      <NavItem title={t.Navigation["Your Videos"]} path={<YourVideosIcon />} />
      <NavItem title={t.Navigation["Downloads"]} path={<DownloadsIcon />} />
    </div>
  ) : (
    <div className="relative">
      <YouCompactMenu
        trigger={<YouCompactBtn title={"You"} isActive={false} />}
      >
        <div>
          <div className="ml-3.5 mb-2 mt-1 text-text font-semibold text-[1.12rem]">
            You
          </div>

          <NavItem
            title={t.Navigation["Your Channel"]}
            path={<YourChannelIcon />}
            compactMode={true}
          />
          <NavItem
            title={t.Navigation["History"]}
            path={<HistoryIcon />}
            compactMode={true}
          />
          <NavItem
            title={t.Navigation["Playlist"]}
            path={<PlaylistIcon />}
            compactMode={true}
          />

          <NavItem
            title={t.Navigation["Watch Later"]}
            path={<WatchLaterIcon />}
            compactMode={true}
          />
          <NavItem
            title={t.Navigation["Liked Videos"]}
            path={<LikedVideosIcon />}
            compactMode={true}
          />
          <NavItem
            title={t.Navigation["Your Videos"]}
            path={<YourVideosIcon />}
            compactMode={true}
          />
          <NavItem
            title={t.Navigation["Downloads"]}
            path={<DownloadsIcon />}
            compactMode={true}
          />
        </div>
      </YouCompactMenu>
    </div>
  );
}
