import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function FooterSection({ lang, isNavbarOpen }: Props) {
  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="flex flex-col gap-3 px-3 pl-6 border-gray-5 py-3 font-medium text-[0.8rem] text-gray-4">
      {" "}
      <div className="flex gap-x-2 flex-wrap">
        <span>About</span> <span>Press</span> <span>Copyright </span>
        <span>Contact us</span> <span>Creators</span> <span>Advertise</span>
        <span>Developers</span>
      </div>
      <div className="flex gap-x-2 flex-wrap">
        <span>Terms</span> <span>Privacy</span> <span>Policy & Safety</span>{" "}
        <span>How YouTube works</span> <span>Test new features</span>
      </div>
      <div className="text-gray-2 font-normal">© 2026 Google LLC</div>
    </div>
  ) : null;
}
