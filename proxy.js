import { NextResponse } from "next/server";
import { ADMIN_COOKIE, readSession } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

// Partners only get Dashboard + Orders. Everything else under /admin is
// admin-only.
const ADMIN_ONLY_PREFIXES = ["/admin/settings", "/admin/pages", "/admin/blog", "/admin/users"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = await readSession(cookie);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  const isAdminOnlyPath = ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isAdminOnlyPath && session.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
