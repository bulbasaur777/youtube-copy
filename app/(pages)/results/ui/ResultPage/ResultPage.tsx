import { searchVideos } from "@/lib/data/videos";
import { getAllTags } from "@/lib/data/tags";
import { Lang } from "@/types/language";
import Spacer from "@/ui/Main/Spacer/Spacer";
import Tags from "@/(pages)/watch/ui/Tags/Tags";
import ResultVideo from "./ResultVideo";
import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";

type Props = {
  videos: Awaited<ReturnType<typeof searchVideos>>;
  tags: Awaited<ReturnType<typeof getAllTags>>;
  lang: Lang;
};

const translations = { ru, ua, en } as const;

export function ResultPage({ videos, tags, lang }: Props) {
  const text = translations[lang].Results;

  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <Spacer />
      <main className="min-w-0 flex-1 px-4 pb-8 text-text sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex min-w-0 items-center gap-6 border-b border-text/10 py-3">
            <div className="min-w-0 flex-1">
              <Tags tags={tags} />
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-3"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h9m4 0h3M4 17h3m4 0h9M13 4v6M7 14v6"
                />
              </svg>
              {text.filters}
            </button>
          </div>

          {videos.length > 0 ? (
            <div className="flex flex-col gap-5 pt-4">
              {videos.map((video, index) => (
                <ResultVideo
                  key={video.id}
                  video={video}
                  lang={lang}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-base text-text/80">
              {text.noResults}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
