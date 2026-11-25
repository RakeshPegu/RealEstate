import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Middleware that runs Clerk auth on all routes except the Inngest API.
 * The matcher (below) limits it to page routes; API routes are handled
 * manually inside this function.
 */

const isPublicRoute = createRouteMatcher([
   "/",
   
])
export default clerkMiddleware(async (auth, req) => {
  // Bypass Clerk for the Inngest endpoint – it does not need auth.
  if (req.nextUrl.pathname.startsWith("/api/inngest")) {
    return NextResponse.next();
  }

  // Protect all other routes with Clerk auth.
  if(!isPublicRoute){
  await auth.protect();
  }
});

export const config = {
  matcher: [
      // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
};
