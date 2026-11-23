import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Middleware that runs Clerk auth on all routes except the Inngest API.
 * The matcher (below) limits it to page routes; API routes are handled
 * manually inside this function.
 */
export default clerkMiddleware(async (auth, req) => {
  // Bypass Clerk for the Inngest endpoint – it does not need auth.
  if (req.nextUrl.pathname.startsWith("/api/inngest")) {
    return NextResponse.next();
  }

  // Protect all other routes with Clerk auth.
  await auth.protect();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
