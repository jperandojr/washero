import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = await isValidSession(cookie);

  if (!valid) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
