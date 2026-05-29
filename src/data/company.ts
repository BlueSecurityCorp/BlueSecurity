import type { Locale } from '../i18n/index';

interface Company {
  name: string;
  slogan: string;
  description: string;
  mission: string;
  vision: string;
  email: string;
  website: string;
  founded: number;
}

const companyData: Record<Locale, Company> = {
  ko: {
    name: 'BlueSecurity',
    slogan: '필요한 보안부터 가볍게 시작하세요',
    description: 'BlueSecurity는 작은 팀도 부담 없이 보안 점검을 시작할 수 있도록 돕습니다.',
    mission: '복잡한 보안 절차보다 지금 필요한 점검부터 시작할 수 있는 환경을 만듭니다.',
    vision: '대한민국 중소기업이 보안 걱정 없이 본업에 집중할 수 있는 세상을 만들어 갑니다.',
    email: 'blue@bluesecurity.online',
    website: 'https://www.bluesecurity.online',
    founded: 2025,
  },
  en: {
    name: 'BlueSecurity',
    slogan: 'Company Size Should Not Determine Security Level',
    description: 'SMEs can build the same level of security as large enterprises — at a reasonable cost.',
    mission: 'We lower the cost barriers of security services so that every company can defend against cyber threats.',
    vision: 'We are building a world where Korean SMEs can focus on their core business without worrying about security.',
    email: 'blue@bluesecurity.online',
    website: 'https://www.bluesecurity.online',
    founded: 2025,
  },
};

export function getCompany(lang: Locale = 'ko'): Company {
  return companyData[lang];
}

/** @deprecated Use getCompany(lang) instead */
export const company = companyData.ko;

interface Milestone {
  year: number;
  event: string;
}

const milestonesData: Record<Locale, Milestone[]> = {
  ko: [
    { year: 2025, event: 'BlueSecurity 설립' },
    { year: 2025, event: 'CodeBlue 베타 출시' },
  ],
  en: [
    { year: 2025, event: 'BlueSecurity Founded' },
    { year: 2025, event: 'CodeBlue Beta Launch' },
  ],
};

export function getMilestones(lang: Locale = 'ko') {
  return milestonesData[lang];
}

export const milestones = milestonesData.ko;

interface TechHighlight {
  title: string;
  description: string;
}

const techHighlightsData: Record<Locale, TechHighlight[]> = {
  ko: [
    { title: '필요한 만큼 시작', description: '처음부터 큰 보안 체계를 요구하지 않고, 현재 상황에서 필요한 점검 범위부터 정리합니다.' },
    { title: '도구와 사람이 함께 확인', description: '자동화된 점검 결과와 전문가 검토를 함께 활용해 놓치기 쉬운 위험을 줄입니다.' },
    { title: '우선순위 중심 안내', description: '발견된 이슈를 모두 나열하는 대신, 먼저 처리해야 할 위험부터 판단할 수 있게 돕습니다.' },
    { title: '조치 가능한 결과', description: '문제의 영향, 재현 조건, 개선 방향을 함께 제공해 실제 수정으로 이어지게 합니다.' },
  ],
  en: [
    { title: 'Start With What You Need', description: 'We do not require a large security program upfront. We help define the right scope for your current situation.' },
    { title: 'Tools Plus Expert Review', description: 'We combine automated checks with expert review to reduce risks that tools alone can miss.' },
    { title: 'Priority-Driven Guidance', description: 'Instead of listing every issue equally, we help identify what should be handled first.' },
    { title: 'Actionable Results', description: 'We provide impact, reproduction context, and remediation guidance so findings lead to real fixes.' },
  ],
};

export function getTechHighlights(lang: Locale = 'ko') {
  return techHighlightsData[lang];
}

export const techHighlights = techHighlightsData.ko;
