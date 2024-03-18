import fs from 'fs';
import path from 'path';

export function getAllRoutes() {
  const blogDirectory = path.join(process.cwd(), 'app', '(landing)', 'blog');
  const rootDirectory = path.join(process.cwd(), 'app', '(landing)');

  const getRoutesFromDirectory = (directory: string, prefix: string) => {
    const files = fs.readdirSync(directory);
    return files.map(file => `${prefix}/${file.replace(/\.tsx?$/, '')}`);
  };

  const blogRoutes = getRoutesFromDirectory(blogDirectory, '/blog')
    .filter(route => route !== '/blog/page');

  const rootRoutes = getRoutesFromDirectory(rootDirectory, '')
    .filter(route => !['/dashboard', '/boards', '/layout', '/page'].includes(route));

  return [...blogRoutes, ...rootRoutes];
}