import { Lang } from "@/types/language";

export default async function WatchPage({ lang }: { lang: Lang }) {
  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <main className="relative w-full flex-1 px-1 pb-1 bg-bg text-text rounded-tl-xl">
        Content
      </main>
    </div>
  );
}
