import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const lang = req.cookies.get("lang")?.value || "ru";
  const res = NextResponse.next();
  res.cookies.set("lang", lang, { path: "/", maxAge: 31536000 }); // год
  return res;
}
