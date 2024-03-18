import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/uploadthing", "/pizarra-online", "/mapa-conceptual", "/diagrama-de-flujo", "/wireframe", "/mapa-mental-online",
  "/mapas-de-procesos", "/blog", "/blog/mapa-conceptual", "/blog/wireframes-online", "/blog/desata-tu-creatividad", "/blog/mapa-de-procesos-herramienta-esencial"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};