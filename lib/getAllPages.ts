import fs from 'fs';
import path from 'path';

export function getAllRoutes() {
  const landingDirectory = path.join(process.cwd(), 'app', '(landing)');

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
        route = route.replace('/page', ''); // strip "/page" from the route
        routes.push(route);
      }
    }
    return routes;
  };

  const landingRoutes = getRoutesFromDirectory(landingDirectory)
    .filter(route => !['/dashboard', '/board'].includes(route) && !route.includes('/layout'));

  return [...landingRoutes];
}