import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth/server";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isAppPage = pathname.startsWith("/app/");

  try {
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
  } catch (error) {
    if (isAppPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup", "/signup/sent", "/login/sent"],
};
