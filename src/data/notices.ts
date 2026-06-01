import type { Locale } from '../i18n/index';

export const noticeCategories = [
  {
    id: 'bluesecurity',
    label: {
      ko: 'BlueSecurity',
      en: 'BlueSecurity',
    },
  },
  {
    id: 'codeblue',
    label: {
      ko: 'CodeBlue',
      en: 'CodeBlue',
    },
  },
  {
    id: 'consulting',
    label: {
      ko: '보안컨설팅',
      en: 'Security Consulting',
    },
  },
] as const;

export function getNoticeCategoryLabel(category: string, lang: Locale): string {
  return noticeCategories.find((item) => item.id === category)?.label[lang] ?? category;
}

export function getNoticeCategoryOptions(lang: Locale) {
  return noticeCategories.map((category) => ({
    id: category.id,
    label: category.label[lang],
  }));
}
