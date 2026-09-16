import NavItem from "../NavItem/NavItem";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import ReportIcon from "../Icons/ReportIcon";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function ReportSection({ lang, isNavbarOpen }: Props) {
  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 border-b-1 border-gray-5 py-3">
      {" "}
      <NavItem title={t.Navigation["Report history"]} path={<ReportIcon />} />
    </div>
  ) : null;
}
