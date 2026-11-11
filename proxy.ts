
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
    matcher: [
        // Exclude Inngest endpoint from Clerk middleware
        "/((?!api/inngest|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

        // Clerk auto-proxy
        "/__clerk/:path*",

        // Other API routes
        "/(api|trpc)(.*)",
    ],
};
