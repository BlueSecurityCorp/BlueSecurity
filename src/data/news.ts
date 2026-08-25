import type { Locale } from '../i18n/index';

export const newsCategories = [
  {
    id: 'security',
    label: { ko: '보안 인사이트', en: 'Security Insights' },
  },
  {
    id: 'industry',
    label: { ko: '산업 동향', en: 'Industry News' },
  },
  {
    id: 'product',
    label: { ko: '제품 소식', en: 'Product News' },
  },
  {
    id: 'newsletter',
    label: { ko: '뉴스레터', en: 'Newsletter' },
  },
] as const;

export const newsTemplates = [
  {
    id: 'weekly-action-brief',
    sourceId: '01-weekly-action-brief',
    label: { ko: '주간 액션 브리핑', en: 'Weekly Action Brief' },
    description: { ko: '매주 핵심 이슈와 이번 주 조치사항을 5분 안에 전달합니다.', en: 'A five-minute weekly brief of key issues and concrete actions.' },
    readTime: { ko: '5분', en: '5 min' },
    cadence: { ko: '주 1회', en: 'Weekly' },
  },
  {
    id: 'critical-security-alert',
    sourceId: '02-critical-security-alert',
    label: { ko: '긴급 보안 경보', en: 'Critical Security Alert' },
    description: { ko: '실제 악용이나 침해처럼 기다릴 수 없는 사건과 즉시 행동을 알립니다.', en: 'An immediate alert for active exploitation, breaches, and urgent action.' },
    readTime: { ko: '2분', en: '2 min' },
    cadence: { ko: '필요 즉시', en: 'As needed' },
  },
  {
    id: 'vulnerability-radar',
    sourceId: '03-vulnerability-radar',
    label: { ko: '취약점 레이더', en: 'Vulnerability Radar' },
    description: { ko: 'CVE를 실제 악용과 자산 노출 관점에서 분류해 패치 순서를 정합니다.', en: 'Prioritizes vulnerabilities using exploitation and asset exposure.' },
    readTime: { ko: '4분', en: '4 min' },
    cadence: { ko: '주 1회·격주', en: 'Weekly or biweekly' },
  },
  {
    id: 'executive-security-brief',
    sourceId: '04-executive-security-brief',
    label: { ko: '경영진 보안 브리프', en: 'Executive Security Brief' },
    description: { ko: '기술 세부사항보다 사업 영향과 필요한 의사결정을 중심으로 설명합니다.', en: 'Explains business impact and decisions without unnecessary technical detail.' },
    readTime: { ko: '3분', en: '3 min' },
    cadence: { ko: '격주·월 1회', en: 'Biweekly or monthly' },
  },
  {
    id: 'monthly-threat-deep-dive',
    sourceId: '05-monthly-threat-deep-dive',
    label: { ko: '월간 위협 딥다이브', en: 'Monthly Threat Deep Dive' },
    description: { ko: '하나의 위협을 배경부터 공격 흐름과 방어 우선순위까지 깊게 해설합니다.', en: 'A long-form analysis of one threat, its flow, and defense priorities.' },
    readTime: { ko: '8분', en: '8 min' },
    cadence: { ko: '월 1회', en: 'Monthly' },
  },
  {
    id: 'security-decision-brief',
    sourceId: '06-security-decision-brief',
    label: { ko: '보안 의사결정 브리프', en: 'Security Decision Brief' },
    description: { ko: '뉴스, 위험 점수, 통제 개선과 후속 추적을 하나의 의사결정 흐름으로 연결합니다.', en: 'Connects news, risk scores, control improvements, and follow-up.' },
    readTime: { ko: '5분', en: '5 min' },
    cadence: { ko: '주 1회', en: 'Weekly' },
  },
  {
    id: 'visual-news-brief',
    sourceId: '07-visual-news-brief',
    label: { ko: '비주얼 뉴스 브리프', en: 'Visual News Brief' },
    description: { ko: '뉴스별 이미지와 캡션으로 핵심 이슈와 행동을 빠르게 이해하도록 돕습니다.', en: 'Uses purposeful visuals and captions to clarify issues and actions.' },
    readTime: { ko: '6분', en: '6 min' },
    cadence: { ko: '주 1회', en: 'Weekly' },
  },
] as const;

export function getNewsCategoryLabel(category: string, lang: Locale): string {
  return newsCategories.find((item) => item.id === category)?.label[lang] ?? category;
}

export function getNewsCategoryOptions(lang: Locale) {
  return newsCategories.map((category) => ({
    id: category.id,
    label: category.label[lang],
  }));
}

export function getNewsTemplateLabel(template: string, lang: Locale): string {
  return newsTemplates.find((item) => item.id === template)?.label[lang] ?? template;
}

export function getNewsTemplateOptions(lang: Locale) {
  return newsTemplates.map((template) => ({
    id: template.id,
    label: template.label[lang],
  }));
}
