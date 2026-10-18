"use client";

import useVideoDetails from "./hooks/useVideoDetails";
import { labels } from "../labels";
import type { VideoDetailsProps } from "./types";
import VideoActions from "./ui/VideoActions";
import VideoDescription from "./ui/VideoDescription";

export default function VideoDetails({ video, lang }: VideoDetailsProps) {
  const state = useVideoDetails();
  const text = labels[lang];

  return (
    <section className="flex flex-col gap-3 text-text">
      {video && (
        <>
          <h1 className="text-xl font-bold leading-7 tracking-[-0.02em]">
            {video.title}
          </h1>
          <VideoActions
            video={video}
            lang={lang}
            text={text}
            state={state}
          />
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
