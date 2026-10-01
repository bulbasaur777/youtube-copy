import { cookies } from "next/headers";
import { Lang } from "@/types/language";
import WatchPage from "./WatchPage/WatchPage";

export default async function Watch() {
  const lang = ((await cookies()).get("lang")?.value || "ru") as Lang;

  return <WatchPage lang={lang} />;
}
