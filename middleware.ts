import { authMiddleware } from "@clerk/nextjs";

//Use the req object to match against urls. The following example makes all routes but /dashboard public.
export default authMiddleware({
  publicRoutes: (req) => !req.url.includes("/dashboard") && !req.url.includes("/board"),
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};