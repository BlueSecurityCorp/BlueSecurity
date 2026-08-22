import type { Locale } from '../i18n/index';

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface ProductPricing {
  productId: string;
  productName: string;
  tiers: PricingTier[];
}

export interface FAQ {
  question: string;
  answer: string;
}

const pricingData: Record<Locale, ProductPricing[]> = {
  ko: [
    {
      productId: 'codeblue',
      productName: 'CodeBlue',
      tiers: [
        {
          name: 'Free',
          price: '0',
          period: '',
          description: '2026년 12월 31일까지 무료 서비스',
          features: [
            'SAST/SBOM 기능',
            'CWE 취약점 분류',
            'CI/CD 파이프라인 연동',
            '라이선스 점검',
            '2026년 12월 31일까지 무료 제공',
          ],
          cta: '무료로 시작하기',
          highlighted: true,
        },
      ],
    },
  ],
  en: [
    {
      productId: 'codeblue',
      productName: 'CodeBlue',
      tiers: [
        {
          name: 'Free',
          price: '0',
          period: '',
          description: 'Free service through December 31, 2026',
          features: [
            'SAST/SBOM features',
            'CWE vulnerability classification',
            'CI/CD pipeline integration',
            'License checks',
            'Free through December 31, 2026',
          ],
          cta: 'Get Started Free',
          highlighted: true,
        },
      ],
    },
  ],
};

export function getPricing(lang: Locale = 'ko'): ProductPricing[] {
  return pricingData[lang];
}

export const pricing = pricingData.ko;

const faqData: Record<Locale, FAQ[]> = {
  ko: [
    { question: 'CodeBlue는 언제까지 무료인가요?', answer: 'CodeBlue는 2026년 12월 31일까지 무료 서비스로 제공합니다.' },
    { question: '무료 기간에도 주요 기능을 사용할 수 있나요?', answer: 'SAST/SBOM 기능, CWE 취약점 분류, CI/CD 파이프라인 연동, 라이선스 점검을 사용할 수 있습니다.' },
    { question: '도입 전에 별도 상담이 필요한가요?', answer: '바로 시작할 수 있습니다. CI/CD 연동이나 운영 환경 관련 확인이 필요하면 문의해 주세요.' },
    { question: '무료 기간 이후 가격은 정해졌나요?', answer: '무료 제공 기간 이후 정책은 확정되는 대로 안내하겠습니다.' },
  ],
  en: [
    { question: 'How long is CodeBlue free?', answer: 'CodeBlue is available as a free service through December 31, 2026.' },
    { question: 'Can I use the main features during the free period?', answer: 'Yes. SAST/SBOM features, CWE vulnerability classification, CI/CD pipeline integration, and license checks are available.' },
    { question: 'Do I need a consultation before adopting CodeBlue?', answer: 'You can start right away. Contact us if you need help with CI/CD integration or operating environment questions.' },
    { question: 'Is pricing after the free period decided?', answer: 'We will announce the policy after the free period once it is finalized.' },
  ],
};

export function getFaq(lang: Locale = 'ko'): FAQ[] {
  return faqData[lang];
}

export const faq = faqData.ko;
