import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");
  const isAppPage = request.nextUrl.pathname.startsWith("/app/");

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/app/home", request.url));
  }

  if (!session && isAppPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup", "/signup/sent", "/login/sent"],
};
