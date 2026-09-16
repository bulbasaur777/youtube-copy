import { IoClose } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import Avatar from "./Avatar/Avatar";
import { useLang } from "@/contexts/LanguageContext";

export default function SearchContent({ isOpen }: { isOpen: boolean }) {
  const searchHistory = ["Lineage 2", "Flameria", "Lu4", "Elmorlab"];
  const { t } = useLang();

  return (
    <div
      className={`absolute z-5 top-[34px] w-full bg-gray-3 search-content transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
    >
      <ul>
        <li className="flex justify-between text-[0.9em] text-gray-4 py-2 px-3">
          <span>{t.Header["History"]}</span>{" "}
          <span>{t.Header["Clear All"]}</span>
        </li>

        {searchHistory.map((item: string) => (
          <li
            key={item}
            className="flex justify-between items-center pl-6 py-2 hover:bg-gray-5 text-[0.9em] cursor-pointer"
          >
            {item} <IoClose className="text-gray-2 text-[1.7em] mr-2" />
          </li>
        ))}

        <div className="m-auto w-[97%] h-px bg-gray-2 px-3 my-3" />

        <li className="flex justify-between items-center text-[0.9em] text-gray-4 pt-1 pb-3 px-3">
          <span>{t.Header["Trends"]}</span>{" "}
          <span>
            <LuRefreshCcw />
          </span>
        </li>

        <ul className="grid grid-cols-2 pb-1">
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> Naga1na
          </li>
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> serega_pirat
          </li>
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> NG_Play
          </li>
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> SK1LL_TV
          </li>
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> G1deonTV
          </li>
          <li className="flex items-center gap-2 px-2 py-2 hover:bg-gray-5 cursor-pointer">
            <Avatar src="" size={24} /> saneking
          </li>
        </ul>
      </ul>
    </div>
  );
}
