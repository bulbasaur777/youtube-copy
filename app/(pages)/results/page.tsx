import { cookies } from "next/headers";
import { Lang } from "@/types/language";
import { searchVideos } from "@/lib/data/videos";
import { getAllTags } from "@/lib/data/tags";
import { ResultPage } from "./ui/ResultPage/ResultPage";

export default async function Result({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const [cookieStore, { query }] = await Promise.all([cookies(), searchParams]);
  const lang = (cookieStore.get("lang")?.value || "ru") as Lang;
  const [videos, tags] = await Promise.all([
    searchVideos(query ?? ""),
    getAllTags(),
  ]);

  return <ResultPage videos={videos} tags={tags} lang={lang} />;
}
