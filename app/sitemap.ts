import { getAllRoutes } from "@/lib/getAllPages";

export default async function sitemap() {
    const baseUrl = 'https://www.sketchlie.com';
    const routes = getAllRoutes();

    const sitemap = routes
        .filter(route => 
            !route.loc.startsWith('/dashboard') && 
            !route.loc.startsWith('/board') && 
            !route.loc.includes('/layout')
        )
        .map(route => ({
            url: `${baseUrl}${route.loc}`,
            lastModified: route.lastmod,
            changeFrequency: route.changefreq,
            priority: route.priority,
        }));

    return sitemap;
}