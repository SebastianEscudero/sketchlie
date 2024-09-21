import 'server-only';

export const dictionaries = {
    en: () => import('@/public/locales/en.json').then(module => module.default),
    pt: () => import('@/public/locales/pt.json').then(module => module.default),
    es: () => import('@/public/locales/es.json').then(module => module.default),
}