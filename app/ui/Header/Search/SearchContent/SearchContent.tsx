import { useLang } from "@/contexts/LanguageContext";
import SearchItem from "./SearchItem/SearchItem";

export default function SearchContent({ isOpen }: { isOpen: boolean }) {
  const searchHistory = ["Lineage 2", "Flameria", "Lu4", "Elmorlab"];
  const { t } = useLang();

  return (
    <div
      className={`absolute z-5 top-[44px] w-full p-2 rounded-lg bg-bg search-content transition-all duration-300 ease-out shadow-sm
         ${
           isOpen
             ? "opacity-100 pointer-events-auto"
             : "opacity-0 pointer-events-none"
         }`}
    >
      <ul>
        {searchHistory.map((item: string) => (
          <SearchItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
}
