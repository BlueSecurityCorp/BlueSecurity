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
    { title: '필요한 범위부터 시작', description: 'SAST, SBOM/SCA, 라이선스 점검과 보안 컨설팅을 필요한 범위부터 단계적으로 적용합니다.' },
    { title: '개발 흐름에 맞춘 연동', description: 'GitHub, GitLab 등 기존 CI/CD 파이프라인에 보안 점검을 붙여 개발 과정에서 이슈를 확인합니다.' },
    { title: '기준 기반 분류', description: '탐지 결과를 CWE, OWASP 등 익숙한 기준으로 정리해 우선순위 판단이 쉽도록 제공합니다.' },
    { title: '조치 중심 결과물', description: '취약점 목록만 전달하지 않고 영향도, 재현 조건, 개선 방향을 함께 정리합니다.' },
  ],
  en: [
    { title: 'Start With What You Need', description: 'Apply SAST, SBOM/SCA, license checks, and security consulting step by step based on your current needs.' },
    { title: 'Fits Development Workflows', description: 'Add security checks to existing GitHub, GitLab, and CI/CD pipelines so issues surface during development.' },
    { title: 'Standards-Based Triage', description: 'Organize findings using familiar references such as CWE and OWASP to make prioritization easier.' },
    { title: 'Action-Oriented Results', description: 'Deliver impact, reproduction context, and remediation guidance instead of only listing vulnerabilities.' },
  ],
};

export function getTechHighlights(lang: Locale = 'ko') {
  return techHighlightsData[lang];
}

export const techHighlights = techHighlightsData.ko;
