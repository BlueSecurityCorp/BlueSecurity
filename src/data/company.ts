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
  address: string;
  representative: string;
  businessRegistrationNumber: string;
}

const companyData: Record<Locale, Company> = {
  ko: {
    name: 'BlueSecurity',
    slogan: '필요한 보안부터 가볍게 시작하세요',
    description: 'BlueSecurity는 중소기업을 위한 보안 서비스를 합리적으로 제공합니다.',
    mission: '복잡한 보안 절차보다 지금 필요한 점검부터 시작할 수 있는 환경을 만듭니다.',
    vision: '대한민국 중소기업이 보안 걱정 없이 본업에 집중할 수 있는 세상을 만들어 갑니다.',
    email: 'blue@bluesecurity.online',
    website: 'https://www.bluesecurity.online',
    founded: 2025,
    address: '경기도 용인시 기흥구 강남서로 9, 7층 703호 N119호(구갈동)',
    representative: '이장호',
    businessRegistrationNumber: '370-09-02609',
  },
  en: {
    name: 'BlueSecurity',
    slogan: 'Company Size Should Not Determine Security Level',
    description: 'BlueSecurity provides security services for SMEs at a practical cost.',
    mission: 'We lower the cost barriers of security services so that every company can defend against cyber threats.',
    vision: 'We are building a world where Korean SMEs can focus on their core business without worrying about security.',
    email: 'blue@bluesecurity.online',
    website: 'https://www.bluesecurity.online',
    founded: 2025,
    address: 'N119, Room 703, 7F, 9 Gangnamseo-ro, Giheung-gu, Yongin-si, Gyeonggi-do, Republic of Korea (Gugal-dong)',
    representative: '이장호',
    businessRegistrationNumber: '370-09-02609',
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
    { title: '필요한 만큼 시작', description: '처음부터 큰 보안 체계를 요구하지 않고, CodeBlue로 현재 필요한 코드 점검부터 시작합니다.' },
    { title: '자동화된 분석 중심', description: '자동화된 보안 서비스로 반복적인 보안 작업의 부담을 줄입니다.' },
    { title: '우선순위 중심 안내', description: '발견된 이슈를 모두 나열하는 대신, 먼저 처리해야 할 위험부터 판단할 수 있게 돕습니다.' },
    { title: '조치 가능한 결과', description: '문제의 영향, 재현 조건, 개선 방향을 함께 제공해 실제 수정으로 이어지게 합니다.' },
  ],
  en: [
    { title: 'Start With What You Need', description: 'Start with the CodeBlue checks your team needs now instead of adopting a large security program upfront.' },
    { title: 'Automated Analysis', description: 'Analyze source code and open-source components automatically to reduce repetitive review work.' },
    { title: 'Priority-Driven Guidance', description: 'Instead of listing every issue equally, we help identify what should be handled first.' },
    { title: 'Actionable Results', description: 'We provide impact, reproduction context, and remediation guidance so findings lead to real fixes.' },
  ],
};

const coreTechnologiesData: Record<Locale, TechHighlight[]> = {
  ko: [
    { title: '보안 데이터 분석', description: '서비스와 시스템에서 발생하는 보안 데이터를 분석해 위험 신호와 취약점을 식별합니다.' },
    { title: '지능형 자동화', description: '반복적인 점검과 분류 과정을 자동화해 조직과 환경에 관계없이 일관된 보안 운영을 지원합니다.' },
    { title: '위험 기반 우선순위', description: '영향도, 노출 가능성, 업무 맥락을 함께 고려해 먼저 대응해야 할 위험을 선별합니다.' },
    { title: '대응 중심 인사이트', description: '탐지 결과의 원인과 영향, 대응 방향을 명확히 제공해 실질적인 보안 개선으로 연결합니다.' },
  ],
  en: [
    { title: 'Security Data Analysis', description: 'We analyze security data from services and systems to identify vulnerabilities and signs of risk.' },
    { title: 'Intelligent Automation', description: 'We automate repetitive assessment and triage workflows to support consistent security operations across organizations and environments.' },
    { title: 'Risk-Based Prioritization', description: 'We consider impact, exposure, and business context together to identify the risks that demand attention first.' },
    { title: 'Response-Oriented Insights', description: 'We clarify the cause, impact, and response path so findings lead to practical security improvements.' },
  ],
};

export function getTechHighlights(lang: Locale = 'ko') {
  return techHighlightsData[lang];
}

export function getCoreTechnologies(lang: Locale = 'ko') {
  return coreTechnologiesData[lang];
}

export const techHighlights = techHighlightsData.ko;
