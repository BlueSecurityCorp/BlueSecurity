export const company = {
  name: 'BlueSecurity',
  slogan: '보안의 민주화',
  description:
    '한국 중소기업을 위한 기업급 사이버보안 솔루션을 합리적 가격에 제공합니다.',
  mission:
    '모든 기업이 규모에 관계없이 최고 수준의 보안을 누릴 수 있는 세상을 만듭니다.',
  vision:
    '대한민국 중소기업 보안의 표준이 되어, 안전한 디지털 비즈니스 환경을 구축합니다.',
  email: 'blue@bluesecurity.online',
  website: 'https://www.bluesecurity.online',
  ceo: '이장호',
  founded: 2025,
} as const;

export const stats = [
  { label: '지원 언어', value: '22+', suffix: '개' },
  { label: '탐지 규칙', value: '10,000+', suffix: '개' },
  { label: '보안 표준 대응', value: '3', suffix: '종', detail: 'OWASP / CWE / ISMS-P' },
] as const;

export const milestones = [
  { year: 2025, event: 'BlueSecurity 설립' },
  { year: 2025, event: 'CodeBlue 베타 출시' },
  { year: 2025, event: 'BluePhalanx 개발 착수' },
  { year: 2026, event: 'BlueProxy 출시' },
] as const;

export const techHighlights = [
  {
    title: 'AI 기반 분석',
    description: 'Claude API, EMBER2024 ML 등 최신 AI 기술로 정밀한 보안 분석',
  },
  {
    title: '다계층 방어',
    description: '단일 솔루션이 아닌, 6계층 파이프라인으로 위협을 다각도 탐지',
  },
  {
    title: '한국 규정 최적화',
    description: 'ISMS-P, 주요통신기반시설, 전자금융감독규정 등 국내 컴플라이언스 완벽 대응',
  },
  {
    title: '유연한 배포',
    description: 'SaaS, On-Premise, Air-Gap 환경 모두 지원하여 어떤 인프라에도 적합',
  },
] as const;
