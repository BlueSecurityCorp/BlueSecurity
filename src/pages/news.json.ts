import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import type { Locale } from '../i18n/index';
import { localePath } from '../i18n/index';
import { getNewsCategoryLabel, getNewsTemplateLabel } from '../data/news';
import { previewNews } from '../data/previewNews';

function slugFromId(id: string): string {
  return id.replace(/\.mdx?$/, '');
}

export const GET: APIRoute = async ({ site }) => {
  const news = await getCollection('news');
  const baseURL = site ?? new URL('https://www.bluesecurity.online');
  const items = news
    .filter((item) => {
      if (item.id.split('/').pop()?.startsWith('_')) return false;
      return item.data.published;
    })
    .map((item) => {
      const lang = item.data.lang as Locale;
      const path = localePath(`/news/${slugFromId(item.id)}`, lang);
      const kakaoEnabled = Boolean(item.data.kakaoMessage || item.data.kakaoButtonLabel);

      return {
        id: slugFromId(item.id),
        title: item.data.title,
        description: item.data.description,
        date: item.data.date,
        updated: item.data.updated ?? null,
        lang,
        category: item.data.category,
        categoryLabel: getNewsCategoryLabel(item.data.category, lang),
        template: item.data.template,
        templateLabel: getNewsTemplateLabel(item.data.template, lang),
        tags: item.data.tags,
        featured: item.data.featured,
        newsletterIssue: item.data.newsletterIssue ?? null,
        image: item.data.image ? new URL(item.data.image, baseURL).toString() : null,
        path,
        url: new URL(path, baseURL).toString(),
        kakao: kakaoEnabled
          ? {
              message: item.data.kakaoMessage ?? item.data.description,
              buttonLabel: item.data.kakaoButtonLabel ?? (lang === 'ko' ? '자세히 보기' : 'Read more'),
            }
          : null,
      };
    });
  const previewItems = previewNews.map((item) => {
    const path = `/news/${item.slug}`;
    return {
      id: item.slug,
      title: item.title,
      description: item.description,
      date: item.date,
      updated: null,
      lang: 'ko' as const,
      category: item.category,
      categoryLabel: getNewsCategoryLabel(item.category, 'ko'),
      template: item.template,
      templateLabel: getNewsTemplateLabel(item.template, 'ko'),
      tags: [...item.tags],
      featured: item.featured,
      newsletterIssue: null,
      image: null,
      path,
      url: new URL(path, baseURL).toString(),
      kakao: {
        message: item.description,
        buttonLabel: '자세히 보기',
      },
    };
  });

  const publishedItems = [...previewItems, ...items]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return new Response(JSON.stringify(publishedItems), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });
};
