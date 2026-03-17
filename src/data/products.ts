export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  href: string;
  features: string[];
  highlights: { label: string; value: string }[];
  icon: 'code' | 'shield' | 'network';
}

export const products: Product[] = [
  {
    id: 'codeblue',
    name: 'CodeBlue',
    tagline: 'AI 기반 소스코드 보안 스캐너',
    description:
      '소스코드의 보안 취약점을 AI가 자동으로 탐지하고, OWASP Top 10, CWE, ISMS-P 기준으로 분류하여 리포트합니다. DevSecOps 파이프라인에 통합하여 개발 단계에서부터 보안을 확보하세요.',
    category: 'SAST (정적 분석)',
    href: '/products/codeblue',
    features: [
      '22개 이상 프로그래밍 언어 지원 (73개로 확대 예정)',
      'OWASP Top 10 / CWE / ISMS-P 표준 대응',
      'SBOM (Software Bill of Materials) 자동 생성',
      'GitLab, GitHub CI/CD 파이프라인 통합',
      'AI 기반 오탐 필터링으로 높은 정확도',
      '한국어 상세 리포트 자동 생성',
    ],
    highlights: [
      { label: '지원 언어', value: '22+' },
      { label: '탐지 규칙', value: '10,000+' },
      { label: '대응 표준', value: '3종' },
    ],
    icon: 'code',
  },
  {
    id: 'bluephalanx',
    name: 'BluePhalanx',
    tagline: '6계층 악성코드 분석 플랫폼',
    description:
      '독립형 악성코드 분석 플랫폼으로, ML 모델부터 샌드박스까지 6단계 탐지 파이프라인을 통해 알려진 위협과 미지의 위협 모두를 식별합니다.',
    category: '악성코드 분석',
    href: '/products/bluephalanx',
    features: [
      '6계층 탐지: EMBER2024 ML → ClamAV → YARA-X → CAPE Sandbox → Suricata → Volatility 3',
      'SaaS / On-Premise / Air-Gap 배포 모드',
      '23개 AI 에이전트 기반 분석',
      'MISP 위협 인텔리전스 연동',
      'STIX 2.1 / TAXII 2.1 표준 호환',
      '실시간 대시보드 및 알림',
    ],
    highlights: [
      { label: '탐지 계층', value: '6단계' },
      { label: 'AI 에이전트', value: '23개' },
      { label: '배포 모드', value: '3종' },
    ],
    icon: 'shield',
  },
  {
    id: 'blueproxy',
    name: 'BlueProxy',
    tagline: '멀티플랫폼 침투 테스트 프록시',
    description:
      'Android, iOS, Windows 환경의 TCP 트래픽을 분석하고 수정할 수 있는 침투 테스트 전용 프록시 도구입니다. 정책 기반 패킷 변조, 코덱 체인, 감사 로깅을 지원합니다.',
    category: '모의침투 도구',
    href: '/products/blueproxy',
    features: [
      'Android / iOS / Windows 멀티플랫폼 지원',
      '정책 기반 패킷 수정 (Policy-based Modification)',
      '코덱 체인을 통한 인코딩/디코딩 자동화',
      '감사 로깅 및 세션 리플레이',
      'SSL/TLS 인터셉트 지원',
      '합법적 침투 테스트 전용 라이선스',
    ],
    highlights: [
      { label: '지원 플랫폼', value: '3종' },
      { label: '프로토콜', value: 'TCP' },
      { label: '용도', value: '모의침투' },
    ],
    icon: 'network',
  },
];
