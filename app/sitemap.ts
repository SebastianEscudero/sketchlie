import { getAllRoutes } from "@/lib/getAllPages";

export default async function sitemap() {
    const baseUrl = 'https://www.sketchlie.com';
    const routes = getAllRoutes();

    const sitemap = routes.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...sitemap
    ];
}