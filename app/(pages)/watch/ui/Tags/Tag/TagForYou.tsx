import { useLang } from "@/contexts/LanguageContext";

export default function TagForYou() {
  const { t } = useLang();
  return (
    <div className="flex-shrink-0 flex justify-center items-center text-center w-[150px] h-[36px] sm:h-[52px] p-2 rounded cursor-pointer text-xs md:text-[1em] duration-1000 text-white bg-[url(https://astatic.trovocdn.net/cat/img/24877fb.png?max_age=31536000)] bg-cover bg-center">
      {t.Tags["For you"]}
    </div>
  );
}
