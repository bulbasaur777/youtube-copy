import { cookies } from "next/headers";
import { Lang } from "./types/language";

import Main from "./ui/Main/Main";

export default async function Home() {
  const lang = ((await cookies()).get("lang")?.value || "ru") as Lang;

  return <Main lang={lang} />;
}
