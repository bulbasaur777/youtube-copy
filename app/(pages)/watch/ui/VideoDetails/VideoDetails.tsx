"use client";

import useVideoDetails from "./hooks/useVideoDetails";
import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import type { VideoDetailsProps } from "./types";
import VideoActions from "./ui/VideoActions";
import VideoDescription from "./ui/VideoDescription";

const translations = { ru, ua, en } as const;

export default function VideoDetails({ video, lang }: VideoDetailsProps) {
  const state = useVideoDetails();
  const text = translations[lang].Watch;

  return (
    <section className="flex flex-col gap-3 text-text">
      {video && (
        <>
          <h1 className="text-lg sm:text-xl font-bold leading-7 tracking-[-0.02em]">
            {video.title}
          </h1>
          <VideoActions video={video} lang={lang} text={text} state={state} />
          <VideoDescription
            video={video}
            lang={lang}
            text={text}
            state={state}
          />
        </>
      )}
    </section>
  );
}
