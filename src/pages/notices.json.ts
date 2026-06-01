import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/index';
import { localePath } from '../i18n/index';
import { getNoticeCategoryLabel } from '../data/notices';

function slugFromId(id: string): string {
  return id.replace(/\.mdx?$/, '');
}

export async function GET() {
  const notices = await getCollection('notices');
  const items = notices
    .filter((notice) => {
      if (notice.id.split('/').pop()?.startsWith('_')) return false;
      return notice.data.published;
    })
    .map((notice) => {
      const lang = notice.data.lang as Locale;
      const url = localePath(`/notices/${slugFromId(notice.id)}`, lang);

      return {
        id: slugFromId(notice.id),
        title: notice.data.title,
        description: notice.data.description ?? '',
        date: notice.data.date,
        lang,
        category: notice.data.category,
        categoryLabel: getNoticeCategoryLabel(notice.data.category, lang),
        url,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return new Response(JSON.stringify(items), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}
