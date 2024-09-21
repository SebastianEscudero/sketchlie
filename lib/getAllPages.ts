import fs from 'fs';
import path from 'path';

const SUPPORTED_LANGUAGES = ['en', 'es', 'pt'];

export function getAllRoutes() {
  const landingDirectory = path.join(process.cwd(), 'app');

  const getRoutesFromDirectory = (directory: string, prefix: string = '') => {
    let routes: any[] = [];
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        routes = [...routes, ...getRoutesFromDirectory(filePath, `${prefix}/${file}`)];
      } else if (stat.isFile() && path.extname(file) === '.tsx') {
        let route = `${prefix}/${file.replace(/\.tsx?$/, '')}/`;
        route = route.replace('/page', '');
        route = route.replace('/(casos-de-uso)', '')
        route = route.replace('/(equipos)', '')
        route = route.replace('/(es)', '')
        
        if (route.includes('[lang]')) {
          SUPPORTED_LANGUAGES.forEach(lang => {
            let localizedRoute = route.replace('[lang]', lang);
            routes.push({
              loc: localizedRoute,
              lastmod: stat.mtime.toISOString(),
              priority: 0.8,
              changefreq: 'weekly'
            });
          });
        } else {
          routes.push({
            loc: route,
            lastmod: stat.mtime.toISOString(),
            priority: 0.8,
            changefreq: 'weekly'
          });
        }
      }
    }
    return routes;
  };

  const landingRoutes = getRoutesFromDirectory(landingDirectory)
    .filter(route => !['/dashboard', '/board'].includes(route.loc) && !route.loc.includes('/layout'));

  // Add static routes
  ['auth/register', 'auth/login', 'auth/reset'].forEach(route => {
    landingRoutes.push({
      loc: `/${route}/`,
      lastmod: new Date().toISOString(),
      priority: 0.9,
      changefreq: 'monthly'
    });
  });

  return landingRoutes;
}