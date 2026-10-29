"use client";

import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import type { Lang } from "@/types/language";
import {
  formatCompactTimeAgo,
  formatViewCount,
} from "../../Videos/Video/helpers/formatVideoMetadata";
import type { DescriptionState } from "../hooks/useVideoDetails";
import type { WatchLabels } from "@/types/watchLabels";
import type { Video } from "../types";

type Props = {
  video: Video;
  lang: Lang;
  text: WatchLabels;
  state: DescriptionState;
};

export default function VideoDescription({
  video,
  lang,
  text,
  state,
}: Props) {
  const description = video.description ?? "";
  const descriptionPreview =
    description.length > 260
      ? `${description.slice(0, 260).trimEnd()}…`
      : description;
  const { isDescriptionExpanded, setIsDescriptionExpanded } = state;

  return (
    <button
      type="button"
      aria-expanded={isDescriptionExpanded}
      onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
      className="w-full rounded-xl bg-gray px-4 py-3 text-left text-sm leading-[1.45] transition-colors hover:bg-gray/80"
    >
      <span className="font-medium">
        {formatViewCount(video.viewsCount ?? 0, lang)} {text.views}
        {video.createdAt && (
          <> · {formatCompactTimeAgo(video.createdAt, lang)}</>
        )}
      </span>
      <span className="mt-2 block whitespace-pre-wrap">
        {isDescriptionExpanded ? description : descriptionPreview}
      </span>
      {description.length > 260 && (
        <span className="mt-1 inline-flex items-center gap-1 font-medium">
          {isDescriptionExpanded ? text.showLess : text.showMore}
          {isDescriptionExpanded ? (
            <LuChevronUp size={16} />
          ) : (
            <LuChevronDown size={16} />
          )}
        </span>
      )}
      {!description && (
        <span className="mt-2 block font-medium">{text.description}</span>
      )}
    </button>
  );
}
