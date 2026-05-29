import type { Locale } from '../i18n/index';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  href: string;
  features: string[];
  highlights: { label: string; value: string }[];
  icon: 'code' | 'shield' | 'network' | 'pentest';
}

const productsData: Record<Locale, Product[]> = {
  ko: [
    {
      id: 'codeblue',
      name: 'CodeBlue',
      tagline: 'AI 기반 소스코드 보안 스캐너',
      description: '소스코드의 보안 취약점을 AI가 자동으로 탐지하고, OWASP Top 10, CWE, ISMS-P 기준으로 분류하여 리포트합니다. DevSecOps 파이프라인에 통합하여 개발 단계에서부터 보안을 확보하세요.',
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
        { label: 'SAST/SBOM 기능', value: 'SAST' },
        { label: 'CWE 취약점 분류', value: 'CWE' },
        { label: 'CI/CD 파이프라인 연동', value: 'CI/CD' },
      ],
      icon: 'code',
    },
    {
      id: 'pentest',
      name: '모의해킹 서비스',
      tagline: '실제 공격자 관점의 보안 진단',
      description: '전문 보안 컨설턴트가 실제 공격자의 관점에서 웹 애플리케이션, 네트워크, 인프라의 취약점을 진단합니다. 체계적인 시나리오 기반 테스트와 상세한 개선 보고서를 제공하여 실질적인 보안 강화를 지원합니다.',
      category: '보안 컨설팅',
      href: '/contact',
      features: [
        '웹/모바일 애플리케이션 모의침투 테스트',
        '내부/외부 네트워크 침투 테스트',
        '시나리오 기반 공격 시뮬레이션',
        'OWASP / PTES / OSSTMM 방법론 준수',
        '한국어 상세 진단 보고서 및 개선 권고안',
        '재진단을 통한 조치 확인',
      ],
      highlights: [
        { label: '침투 테스트', value: 'Pentest' },
        { label: '웹·앱 취약점 진단', value: 'Web/App' },
        { label: '인프라 진단', value: 'Infra' },
      ],
      icon: 'pentest',
    },
  ],
  en: [
    {
      id: 'codeblue',
      name: 'CodeBlue',
      tagline: 'AI-Powered Source Code Security Scanner',
      description: 'AI automatically detects security vulnerabilities in source code and classifies them according to OWASP Top 10, CWE, and ISMS-P standards. Integrate into your DevSecOps pipeline to secure code from the development stage.',
      category: 'SAST (Static Analysis)',
      href: '/en/products/codeblue',
      features: [
        'Supports 22+ programming languages (expanding to 73)',
        'OWASP Top 10 / CWE / ISMS-P compliance',
        'Automatic SBOM (Software Bill of Materials) generation',
        'GitLab & GitHub CI/CD pipeline integration',
        'AI-based false positive filtering for high accuracy',
        'Auto-generated detailed reports in Korean',
      ],
      highlights: [
        { label: 'SAST/SBOM Features', value: 'SAST' },
        { label: 'CWE Classification', value: 'CWE' },
        { label: 'CI/CD Integration', value: 'CI/CD' },
      ],
      icon: 'code',
    },
    {
      id: 'pentest',
      name: 'Penetration Testing Service',
      tagline: 'Security Assessment from an Attacker\'s Perspective',
      description: 'Our expert security consultants assess vulnerabilities in web applications, networks, and infrastructure from a real attacker\'s perspective. We provide systematic scenario-based testing and detailed remediation reports.',
      category: 'Security Consulting',
      href: '/en/contact',
      features: [
        'Web/mobile application penetration testing',
        'Internal/external network penetration testing',
        'Scenario-based attack simulation',
        'OWASP / PTES / OSSTMM methodology compliance',
        'Detailed assessment reports with remediation guidance',
        'Verification through re-assessment',
      ],
      highlights: [
        { label: 'Penetration Testing', value: 'Pentest' },
        { label: 'Web/App Assessment', value: 'Web/App' },
        { label: 'Infrastructure Assessment', value: 'Infra' },
      ],
      icon: 'pentest',
    },
  ],
};

export function getProducts(lang: Locale = 'ko'): Product[] {
  return productsData[lang];
}

export function getProductLineup(lang: Locale = 'ko'): Product[] {
  return productsData[lang].filter((product) => product.id === 'codeblue' || product.id === 'pentest');
}

/** @deprecated Use getProducts(lang) instead */
export const products = productsData.ko;
