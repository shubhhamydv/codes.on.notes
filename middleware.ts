// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // ── Admin routes ────────────────────────────────────────────────────────
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ── Premium routes ───────────────────────────────────────────────────────
    if (path.startsWith("/premium/content") && !token?.isPremium && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/premium?upgrade=1", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const protectedPaths = ["/dashboard", "/admin", "/premium/content"];
        const isProtected = protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p));
        if (isProtected) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/premium/content/:path*"],
};
