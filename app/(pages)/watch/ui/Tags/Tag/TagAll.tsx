import { useLang } from "@/contexts/LanguageContext";
import { BiJoystick } from "react-icons/bi";

export default function TagAll() {
  const { t } = useLang();
  return (
    <div className="flex-shrink-0 flex justify-center items-center text-center w-[96px] h-[36px] sm:h-[52px] p-2 rounded cursor-pointer text-xs md:text-[0.85em] duration-300 text-white bg-gray-7 hover:bg-gray-8">
      <BiJoystick className="size-4.5 mr-1.5" /> {t.Tags.All}
    </div>
  );
}
