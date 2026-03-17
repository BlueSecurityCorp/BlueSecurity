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
    slogan: '기업 규모가 보안 수준을 결정하지 않습니다',
    description: '중소기업도 대기업과 동일한 수준의 보안을 합리적인 비용으로 구축할 수 있습니다.',
    mission: '보안 서비스의 비용 장벽을 낮춰, 모든 기업이 사이버 위협에 대응할 수 있는 환경을 만듭니다.',
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

interface Stat {
  label: string;
  value: string;
  suffix: string;
  detail?: string;
}

const statsData: Record<Locale, Stat[]> = {
  ko: [
    { label: '지원 언어', value: '22+', suffix: '개' },
    { label: '탐지 규칙', value: '10,000+', suffix: '개' },
    { label: '보안 표준 대응', value: '3', suffix: '종', detail: 'OWASP / CWE / ISMS-P' },
  ],
  en: [
    { label: 'Languages', value: '22+', suffix: '' },
    { label: 'Detection Rules', value: '10,000+', suffix: '' },
    { label: 'Standards', value: '3', suffix: '', detail: 'OWASP / CWE / ISMS-P' },
  ],
};

export function getStats(lang: Locale = 'ko') {
  return statsData[lang];
}

export const stats = statsData.ko;

interface Milestone {
  year: number;
  event: string;
}

const milestonesData: Record<Locale, Milestone[]> = {
  ko: [
    { year: 2025, event: 'BlueSecurity 설립' },
    { year: 2025, event: 'CodeBlue 베타 출시' },
    { year: 2025, event: 'BluePhalanx 개발 착수' },
    { year: 2026, event: 'BlueProxy 출시' },
  ],
  en: [
    { year: 2025, event: 'BlueSecurity Founded' },
    { year: 2025, event: 'CodeBlue Beta Launch' },
    { year: 2025, event: 'BluePhalanx Development Started' },
    { year: 2026, event: 'BlueProxy Released' },
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
    { title: 'AI 기반 분석', description: 'Claude API, EMBER2024 ML 등 최신 AI 기술로 정밀한 보안 분석' },
    { title: '다계층 방어', description: '단일 솔루션이 아닌, 6계층 파이프라인으로 위협을 다각도 탐지' },
    { title: '한국 규정 최적화', description: 'ISMS-P, 주요통신기반시설, 전자금융감독규정 등 국내 컴플라이언스 완벽 대응' },
    { title: '유연한 배포', description: 'SaaS, On-Premise, Air-Gap 환경 모두 지원하여 어떤 인프라에도 적합' },
    { title: '모의해킹 서비스', description: '전문 보안 컨설턴트가 실제 공격자 관점에서 시스템 취약점을 진단하고 개선 방안을 제시' },
  ],
  en: [
    { title: 'AI-Powered Analysis', description: 'Precise security analysis using Claude API, EMBER2024 ML, and other cutting-edge AI technologies' },
    { title: 'Multi-Layer Defense', description: 'Detect threats from multiple angles through a 6-layer pipeline, not a single solution' },
    { title: 'Korean Compliance', description: 'Full compliance with ISMS-P, critical infrastructure, and financial regulation standards' },
    { title: 'Flexible Deployment', description: 'Supports SaaS, On-Premise, and Air-Gap environments for any infrastructure' },
    { title: 'Penetration Testing', description: 'Expert security consultants diagnose vulnerabilities from an attacker\'s perspective and provide remediation plans' },
  ],
};

export function getTechHighlights(lang: Locale = 'ko') {
  return techHighlightsData[lang];
}

export const techHighlights = techHighlightsData.ko;
