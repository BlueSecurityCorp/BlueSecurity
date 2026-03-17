export type Locale = 'ko' | 'en';

export const defaultLocale: Locale = 'ko';
export const locales: Locale[] = ['ko', 'en'];

export function getLocaleFromURL(url: URL): Locale {
  const path = url.pathname;
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return 'ko';
}

export function localePath(path: string, lang: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ko') return clean;
  return `/en${clean}`;
}

export function switchLocalePath(currentPath: string, targetLang: Locale): string {
  const stripped = currentPath.replace(/^\/en(\/|$)/, '/');
  if (targetLang === 'ko') return stripped || '/';
  return `/en${stripped === '/' ? '' : stripped}`;
}
