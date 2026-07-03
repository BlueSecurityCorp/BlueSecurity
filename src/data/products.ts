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
  icon: 'code' | 'shield' | 'network';
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
  ],
};

export function getProducts(lang: Locale = 'ko'): Product[] {
  return productsData[lang];
}

export function getProductLineup(lang: Locale = 'ko'): Product[] {
  return productsData[lang].filter((product) => product.id === 'codeblue');
}

/** @deprecated Use getProducts(lang) instead */
export const products = productsData.ko;
